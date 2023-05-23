import { firestore } from "../../firebase";
import { Employee, Documents } from "@/root/interface/departments";
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
  try {
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
  } catch (error) {
    return {
      message: `An error occurred while creating the department: ${error}`,
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
  try {
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
  } catch (error) {
    console.error("Error updating department:", error);
    throw new Error("Failed to update department");
  }
};

export const departmentProvider = {
  getAll,
  getByDocId,
  create,
  updateById,
};

export default departmentProvider;
