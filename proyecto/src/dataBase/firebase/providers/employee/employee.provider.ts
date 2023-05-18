import { Brands, Schedule } from "@/root/interface/employee";
import { firestore, auth } from "../../firebase";//TODO:You should use relative paths with @
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
  try {//TODO: use only try catch in special cases and in the controllers or interfaces, because it is redundant and not clean code
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
    console.error("Error al actualizar el empleado:", error);//TODO: You should erase all console log
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
  idDepartment: string,
  password: string,
  email: string,
  boss: string,
  schedule: Schedule[],
  brands: Brands[],
): Promise<{ message: string; employee?: any }> => {
  try {//TODO: use only try catch in special cases and in the controllers or interfaces, because it is redundant and not clean code
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
      brands: brands.map((s: Brands) => ({
        date: s.date,
        startTime: s.startTime,
        endTime: s.endTime,
        justification: s.justification,
        finished: s.finished,
      })),
    });

    const newDoc = await getDoc(newDocRef);

    if (newDoc.exists()) {
      return {
        message: "Empleado creado correctamente",
        employee: newDoc.data(),
      };
    } else {//TODO: You should not use else or simplify the complex with reverse if
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
  } else {//TODO: You should not use else or simplify the complex with reverse if
    return employeeSnapshot.docs[0].data();
  }
};

const deleteByUid = async (uid: string) => {
  try {//TODO: use only try catch in special cases and in the controllers or interfaces, because it is redundant and not clean code
    const employeeCollection = collection(firestore, "employee");
    const employeeQuery = query(employeeCollection, where("uid", "==", uid));
    const employeeSnapshot: QuerySnapshot<DocumentData> = await getDocs(employeeQuery);

    if (employeeSnapshot.size === 0) {
      console.log(`No se encontró ningún empleado con UID ${uid}`);//TODO: You should erase all console log
      return;
    }

    const employeeRef = doc(firestore, "employee", employeeSnapshot.docs[0].id);
    await updateDoc(employeeRef, { enabled: false });

    console.log(`Empleado con UID ${uid} actualizado correctamente`);//TODO: You should erase all console log
  } catch (error) {
    console.error(`Error al actualizar el empleado con UID ${uid}:`, error);//TODO: You should erase all console log
  }
};

const getByEmailPassword = async (email: string, password: string) => {


  try {//TODO: use only try catch in special cases and in the controllers or interfaces, because it is redundant and not clean code
    const userCredential = await signInWithEmailAndPassword(auth,email, password);
    const user = userCredential.user;
    if (!user) {
      throw new Error("No user found with that email and password");
    }else{//TODO: You should not use else or simplify the complex with reverse if
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
    }
  } catch (error) {
    throw new Error("No employee found with that email and password");
  }


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
