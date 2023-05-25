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
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const getAll = async () => {
  const employeeCollection = collection(firestore, "employee");
  const employeeSnapshot: QuerySnapshot<DocumentData> = await getDocs(
    employeeCollection
  );
  const employees: DocumentData[] = employeeSnapshot.docs.map((doc) =>
    doc.data()
  );

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
      vacations,
    });

    const snapshotEmployeeUpdate = await getDoc(employeeDoc);
    const employeeUpdate = snapshotEmployeeUpdate.data();
    return employeeUpdate;
  }
};

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
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
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
      message: "Employee create successfully",
      employee: newDoc.data(),
    };
  } else {
    return {
      message: "Employee don't create",
    };
  }
};

const getByUid = async (uid: string) => {
  const employeeCollection = collection(firestore, "employee");
  const employeeQuery = query(employeeCollection, where("uid", "==", uid));
  const employeeSnapshot: QuerySnapshot<DocumentData> = await getDocs(
    employeeQuery
  );

  if (employeeSnapshot.empty) {
    throw new Error(`User not found: ${uid}`);
  } else {
    return employeeSnapshot.docs[0].data();
  }
};

const deleteByUid = async (uid: string) => {
  const employeeCollection = collection(firestore, "employee");
  const employeeQuery = query(employeeCollection, where("uid", "==", uid));
  const employeeSnapshot: QuerySnapshot<DocumentData> = await getDocs(
    employeeQuery
  );

  if (employeeSnapshot.size === 0) {
    return;
  }

  const employeeRef = doc(firestore, "employee", employeeSnapshot.docs[0].id);
  await updateDoc(employeeRef, { enabled: false });
};

const login = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;
  if (!user) {
    throw new Error("No user found with that email and password");
  } else {
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
};

const getByCedula = async (cedula: string) => {
  const employeeCollection = collection(firestore, "employee");
  const employeeQuery = query(
    employeeCollection,
    where("cedula", "==", cedula)
  );
  const employeeSnapshot: QuerySnapshot<DocumentData> = await getDocs(
    employeeQuery
  );

  if (employeeSnapshot.empty) {
    throw new Error(`User not found ${cedula}`);
  } else {
    return employeeSnapshot.docs[0].data();
  }
};

const dismissByUid = async (uid: string) => {
  const employeeCollection = collection(firestore, "employee");
  const employeeQuery = query(employeeCollection, where("uid", "==", uid));
  const employeeSnapshot: QuerySnapshot<DocumentData> = await getDocs(
    employeeQuery
  );

  if (employeeSnapshot.size === 0) {
    return;
  }
  const employeeRef = doc(firestore, "employee", employeeSnapshot.docs[0].id);
  await updateDoc(employeeRef, { idDepartment: "" });
};

const getByVariable = async (data: string, variable: string) => {
  const employeeCollection = collection(firestore, "employee");
  const employeeQuery = query(employeeCollection, where(variable, "==", data));
  const employeeSnapshot: QuerySnapshot<DocumentData> = await getDocs(
    employeeQuery
  );

  const employees: any[] = [];

  if (!employeeSnapshot.empty) {
    employeeSnapshot.forEach((doc) => {
      employees.push(doc.data());
    });
  }

  return employees;
};

const getVacationsByUid = async (uid: string) => {
  const employeeCollection = collection(firestore, "employee");
  const employeeQuery = query(employeeCollection, where("uid", "==", uid));

  const employeeSnapshot = await getDocs(employeeQuery);

  if (employeeSnapshot.empty) {
    return [];
  }

  const employeeDoc = employeeSnapshot.docs[0];
  const vacations = employeeDoc.data().vacations;

  return vacations;
};

const getEmployeesByIdDepartment = async (idDepartment: string) => {
  const employeeCollection = collection(firestore, "employee");
  const employeeQuery = query(
    employeeCollection,
    where("idDepartment", "==", idDepartment)
  );
  const employeeSnapshot: QuerySnapshot<DocumentData> = await getDocs(
    employeeQuery
  );

  const employees: any[] = [];

  if (!employeeSnapshot.empty) {
    employeeSnapshot.forEach((doc) => {
      employees.push(doc.data());
    });
  }

  return employees;
};

const getAllUD = async () => {
  const departmentCollection = collection(firestore, "departments");
  const departmentQuery = query(
    departmentCollection,
    where("leader", "!=", "")
  );
  const departmentSnapshot = await getDocs(departmentQuery);

  const departmentIds: any[] = [];

  if (!departmentSnapshot.empty) {
    departmentSnapshot.forEach((doc) => {
      const department = doc.data();
      departmentIds.push(department.idEmployee);
    });
  }

  return departmentIds;
};

const getAllBosses = async () => {
  const departmentIds = await getAllUD();

  const employeeCollection = collection(firestore, "employee");
  const employeeQuery = query(
    employeeCollection,
    where("uid", "in", departmentIds)
  );
  const employeeSnapshot = await getDocs(employeeQuery);

  const employees: DocumentData[] = [];

  if (!employeeSnapshot.empty) {
    employeeSnapshot.forEach((doc) => {
      employees.push(doc.data());
    });
  }

  return employees;
};

export const employeeProvider = {
  getAll,
  getByUid,
  deleteByUid,
  create,
  login,
  updatByUid,
  getByCedula,
  dismissByUid,
  getByVariable,
  getVacationsByUid,
  getEmployeesByIdDepartment,
  getAllBosses,
};

export default employeeProvider;
