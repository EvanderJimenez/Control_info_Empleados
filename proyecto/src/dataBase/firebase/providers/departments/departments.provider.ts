import { firestore } from "../../firebase";
import { Employee } from "@/root/interface/departments";
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

const getAll = async () => {
  const departmentsCollection = collection(firestore, "departments");
  const departmentsSnapshot: QuerySnapshot<DocumentData> = await getDocs(
    departmentsCollection
  );
  const departments: DocumentData[] = departmentsSnapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });

  return departments;
};

async function create(
  name: string,
  size: number,
  location: string,
  idEmployee: string,
  leader: string,
  level: string,
  subDepartment: string,
  employees: Employee
): Promise<{ message: string; departments?: any }> {
  const newDocRef = await addDoc(collection(firestore, "departments"), {
    name,
    size,
    location,
    idEmployee,
    leader,
    level,
    subDepartment,
    employees,
  });

  const newDoc = await getDoc(newDocRef);

  if (newDoc.exists()) {
    return {
      message: "Successfully created department",
      departments: newDoc.data(),
    };
  } else {
    return {
      message: "Failed to create department",
    };
  }
}

const getByDocId = async (docId: string) => {
  const departmentsDocRef = doc(collection(firestore, "departments"), docId);
  const departmentsDocSnapshot = await getDoc(departmentsDocRef);

  if (departmentsDocSnapshot.exists()) {
    return departmentsDocSnapshot.data();
  } else {//TODO: You should not use else or simplify the complex with reverse if
    throw new Error(`A department with document ID was not found: ${docId}`);
  }
};

const updateById = async (
  id: string,
  name: string,
  size: number,
  location: string,
  idEmployee: string,
  leader: string,
  level: string,
  subDepartment: string,
  employees: Employee
) => {
  const departmentsRef = collection(firestore, "departments");
  const q = query(departmentsRef, where("name", "==", name));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.size > 0) {
    const departmentsDoc = doc(
      firestore,
      "departments",
      querySnapshot.docs[0].id
    );
    await updateDoc(departmentsDoc, {
      name,
      size,
      location,
      idEmployee,
      leader,
      level,
      subDepartment,
      employees,
    });
    const snapshotDepartmentUpdate = await getDoc(departmentsDoc);
    const departmentUpdate = snapshotDepartmentUpdate.data();
    return departmentUpdate;
  }
};

const getDepartmentByUidEmployee = async () => {
  const departmentCollection = collection(firestore, "departments");
  const departQuery = query(
    departmentCollection,
    where("idEmployee", "==", ""),
    where("boss", "==", "")
  );
  const departSnapshot: QuerySnapshot<DocumentData> = await getDocs(
    departQuery
  );

  const departs: any[] = [];

  if (!departSnapshot.empty) {
    departSnapshot.forEach((doc) => {
      departs.push(doc.data());
    });
  }

  return departs;
};

export const departmentProvider = {
  getAll,
  getByDocId,
  create,
  updateById,
  getDepartmentByUidEmployee,
};

export default departmentProvider;
