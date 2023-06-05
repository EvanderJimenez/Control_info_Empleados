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
  orderBy,
  limit,
  startAfter,
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

const getDepartmentsByPage = async (pageSize: number, page: number) => {
  console.log(pageSize, page);
  const departmentsCollection = collection(firestore, "departments");
  const limitPage = pageSize * page;
  const departmentsQuery = query(
    departmentsCollection,
    orderBy("name"),
    limit(limitPage), 
    startAfter(pageSize * page)
  );
  const departmentsSnapshot: QuerySnapshot<DocumentData> = await getDocs(
    departmentsQuery
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
  } else {
    throw new Error(`A department with document ID was not found: ${docId}`);
  }
};

const getName = async (name: string) => {
  const departmentsQuery = query(
    collection(firestore, "departments"),
    where("name", "==", name)
  );

  const querySnapshot = await getDocs(departmentsQuery);

  if (!querySnapshot.empty) {
    const departments = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      const id = doc.id;
      return { id, ...data };
    });
    return departments;
  } else {
    throw new Error(`No department found with name: ${name}`);
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
  getDepartmentsByPage,
  getName,
};

export default departmentProvider;
