import { firestore } from "../../firebase";
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
} from "firebase/firestore";

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

const getByUid = async (uid: string) => {
  const employeeCollection = collection(firestore, "employee");
  const employeeQuery = query(employeeCollection, where("uid", "==", uid));
  const employeeSnapshot: QuerySnapshot<DocumentData> = await getDocs(
    employeeQuery
  );

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
    const employeeSnapshot: QuerySnapshot<DocumentData> = await getDocs(
      employeeQuery
    );

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

export const employeeProvider = {
  getAll,
  getByUid,
  deleteByUid,
};

export default employeeProvider;
