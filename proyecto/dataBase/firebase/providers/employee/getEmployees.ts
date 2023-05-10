import { firestore } from "../../firebase";
import { collection, getDocs, DocumentData, QuerySnapshot,doc,getDoc } from "firebase/firestore";

const getAll = async () => {
  const employeeCollection = collection(firestore, "employee");
  const employeeSnapshot: QuerySnapshot<DocumentData> = await getDocs(
    employeeCollection
  );
  const employees: DocumentData[] = employeeSnapshot.docs.map((doc) =>
    doc.data()
  );

  return employees;
}

const getByUid = async (uid: string) => {
  const employeeDoc = doc(firestore, "employee", uid);
  const employeeSnapshot = await getDoc(employeeDoc);
  
  if (employeeSnapshot.exists()) {
    return employeeSnapshot.data();
  } else {
    throw new Error(`No se encontró un empleado con UID: ${uid}`);
  }
}

export const employeeProvider = {
  getAll,
  getByUid,

}

export default employeeProvider;
