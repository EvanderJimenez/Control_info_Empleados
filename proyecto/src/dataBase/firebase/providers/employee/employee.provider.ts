import { Brands, Schedule, Vacations } from "@/root/interface/employee";
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
  schedule: Schedule[],
  vacations: Vacations
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
        schedule,
        vacations
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
  idDepartment: string,
  password: string,
  email: string,
  boss: string,
  schedule: Schedule[],
  brands: Brands[],
  vacations: Vacations
): Promise<{ message: string; employee?: any }> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    uid = user.uid;

    const defaultSchedule: Schedule[] = [
      { day: "Monday", startTime: "", endTime: "" },
      { day: "Tuesday", startTime: "", endTime: "" },
      { day: "Wednesday", startTime: "", endTime: "" },
      { day: "Thursday", startTime: "", endTime: "" },
      { day: "Friday", startTime: "", endTime: "" },
      { day: "Saturday", startTime: "", endTime: "" },
      { day: "Sunday", startTime: "", endTime: "" },
    ];

    const mergedSchedule: Schedule[] = defaultSchedule.map((defaultDay) => {
      const userDay = schedule.find((s) => s.day === defaultDay.day);
      return {
        ...defaultDay,
        ...userDay,
      };
    });

    
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
      vacations,
      schedule: mergedSchedule,
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

  } catch (error) {
    console.error(`Error al actualizar el empleado con UID ${uid}:`, error);
  }
};

const login = async (email: string, password: string) => {


  try {
    const userCredential = await signInWithEmailAndPassword(auth,email, password);
    const user = userCredential.user;
    if (!user) {
      throw new Error("No user found with that email and password");
    }else{
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


const getByCedula= async (cedula: string) =>{
  const employeeCollection = collection(firestore, "employee");
  const employeeQuery = query(employeeCollection, where("cedula", "==", cedula));
  const employeeSnapshot: QuerySnapshot<DocumentData> = await getDocs(employeeQuery);

  if (employeeSnapshot.empty) {
    throw new Error(`No se encontró un empleado con UID: ${cedula}`);
  } else {
    return employeeSnapshot.docs[0].data();
  }
}

const dismissByUid= async (uid: string) =>{
  const employeeCollection = collection(firestore, "employee");
  const employeeQuery = query(employeeCollection, where("uid", "==", uid));
  const employeeSnapshot: QuerySnapshot<DocumentData> = await getDocs(employeeQuery);

  if (employeeSnapshot.size === 0) {
    console.log(`No se encontró ningún empleado con UID ${uid}`);
    return;
  }
  const employeeRef = doc(firestore, "employee", employeeSnapshot.docs[0].id);
  await updateDoc(employeeRef, { idDepartment: "" });
}

const getByVariable= async (data: string, variable: string) =>{
  const employeeCollection = collection(firestore, "employee");
  const employeeQuery = query(employeeCollection, where(variable, "==", data));
  const employeeSnapshot: QuerySnapshot<DocumentData> = await getDocs(employeeQuery);

  const employees: any[] = [];

  if (!employeeSnapshot.empty) {
    employeeSnapshot.forEach((doc) => {
      employees.push(doc.data());
    });
  }


  return employees;
}

export const employeeProvider = {
  getAll,
  getByUid,
  deleteByUid,
  create,
  login,
  updatByUid,
  getByCedula,
  dismissByUid,
  getByVariable
};

export default employeeProvider;
