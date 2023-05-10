import { firestore } from "../../firebase";
import { collection, getDocs, DocumentData, QuerySnapshot,doc,getDoc, query,where } from "firebase/firestore";

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
  console.log(uid)
    const employeeCollection = collection(firestore, "employee");
    const employeeQuery = query(employeeCollection, where("uid", "==", uid ));
    console.log(uid)
    const employeeSnapshot: QuerySnapshot<DocumentData> = await getDocs(employeeQuery);
    
    if (employeeSnapshot.empty) {
      throw new Error(`No se encontró un empleado con UID: ${uid}`);
    } else {
      return employeeSnapshot.docs[0].data();
    }
  }

export const employeeProvider = {
  getAll,
  getByUid,

}

export default employeeProvider;
