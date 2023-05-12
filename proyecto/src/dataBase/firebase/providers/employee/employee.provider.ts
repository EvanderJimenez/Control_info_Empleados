import { Schedule } from "@/root/interface/employee";
import { firestore, auth } from "../../firebase";
import {
  collection,
  getDocs,
  DocumentData,
  QuerySnapshot,
  doc,
  getDoc,
  query,
  where,
  updateDoc,
  addDoc,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";

const getAll = async () => {
  const employeeCollection = collection(firestore, "employee");
  const employeeSnapshot: QuerySnapshot<DocumentData> = await getDocs(employeeCollection);
  const employees: DocumentData[] = employeeSnapshot.docs.map((doc) => doc.data());

  return employees;
};

const updatByUid = async (
  uid: string,
  name: string,
  firstSurname: string,
  secondSurname: string,
  cedula: number,
  phoneNumber: number,
  photo: string,
  jobPosition: string,
  salary: number,
  enabled: boolean,
  idDepartment: number,
  password: string,
  email: string,
  boss: string,
  schedule: Schedule[]
) => {
  try {
    const employeesRef = collection(firestore, "employee");
    const q = query(employeesRef, where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size > 0) {
      const employeeDoc = doc(firestore, "employee", querySnapshot.docs[0].id);
      await updateDoc(employeeDoc, {
        name,
        firstSurname,
        secondSurname,
        cedula,
        phoneNumber,
        photo,
        jobPosition,
        salary,
        enabled,
        idDepartment,
        password,
        email,
        boss,
        schedule: schedule.map((s: Schedule) => ({
          day: s.day,
          startTime: s.startTime,
          endTime: s.endTime,
        })),
      });
      const snapshotEmpleadoActualizado = await getDoc(employeeDoc);
      const empleadoActualizado = snapshotEmpleadoActualizado.data();
      return empleadoActualizado;
    }
  } catch (error) {
    console.error("Error al actualizar el empleado:", error);
    throw new Error("No se pudo actualizar el empleado");
  }
}


const create = async (
  uid: string,
  name: string,
  firstSurname: string,
  secondSurname: string,
  cedula: number,
  phoneNumber: number,
  photo: string,
  jobPosition: string,
  salary: number,
  enabled: boolean,
  idDepartment: number,
  password: string,
  email: string,
  boss: string,
  schedule: Schedule[]
): Promise<{ message: string; employee?: any }> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    uid = user.uid;

    const newDocRef = await addDoc(collection(firestore, "employee"), {
      uid,
      name,
      firstSurname,
      secondSurname,
      cedula,
      phoneNumber,
      photo,
      jobPosition,
      salary,
      enabled,
      idDepartment,
      password,
      email,
      boss,
      schedule: schedule.map((s: Schedule) => ({
        day: s.day,
        startTime: s.startTime,
        endTime: s.endTime,
      })),
    });

    const newDoc = await getDoc(newDocRef);

    if (newDoc.exists()) {
      return {
        message: "Empleado creado correctamente",
        employee: newDoc.data(),
      };
    } else {
      return {
        message: "No se pudo crear el empleado",
      };
    }
  } catch (error) {
    return {
      message: `Ocurrió un error al crear el empleado: ${error}`,
    };
  }
};

const getByUid = async (uid: string) => {
  const employeeCollection = collection(firestore, "employee");
  const employeeQuery = query(employeeCollection, where("uid", "==", uid));
  const employeeSnapshot: QuerySnapshot<DocumentData> = await getDocs(employeeQuery);

  if (employeeSnapshot.empty) {
    throw new Error(`No se encontró un empleado con UID: ${uid}`);
  } else {
    return employeeSnapshot.docs[0].data();
  }
};

const deleteByUid = async (uid: string) => {
  try {
    const employeeCollection = collection(firestore, "employee");
    const employeeQuery = query(employeeCollection, where("uid", "==", uid));
    const employeeSnapshot: QuerySnapshot<DocumentData> = await getDocs(employeeQuery);

    if (employeeSnapshot.size === 0) {
      console.log(`No se encontró ningún empleado con UID ${uid}`);
      return;
    }

    const employeeRef = doc(firestore, "employee", employeeSnapshot.docs[0].id);
    await updateDoc(employeeRef, { enabled: false });

    console.log(`Empleado con UID ${uid} actualizado correctamente`);
  } catch (error) {
    console.error(`Error al actualizar el empleado con UID ${uid}:`, error);
  }
};

const getByEmailPassword = async (email: string, password: string) => {
  const employeeCollection = collection(firestore, "employee");
  const employeeQuery = query(
    employeeCollection,
    where("email", "==", email),
    where("password", "==", password)
  );
  const employeeSnapshot: QuerySnapshot<DocumentData> = await getDocs(
    employeeQuery
  );
  const employeeDoc = employeeSnapshot.docs[0];

  if (!employeeDoc) {
    throw new Error("No employee found with that email and password");
  }

  return employeeDoc.data();
};



export const employeeProvider = {
  getAll,
  getByUid,
  deleteByUid,
  create,
  getByEmailPassword,
  updatByUid,
};

export default employeeProvider;
