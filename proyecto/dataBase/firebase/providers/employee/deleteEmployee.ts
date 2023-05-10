import { firestore } from "../../firebase";
import { collection, query, where, getDocs, DocumentData, QuerySnapshot, updateDoc, doc } from "firebase/firestore";
import { NextApiResponse } from "next";

export default async function deleteEmployee(
  email: string,
  res: NextApiResponse<any>
) {

  const employeeCollection = collection(firestore, "employee");
  console.log("Email: " + email)
  const employeeQuery = query(
    employeeCollection,
    where("email", "==", email)
  );

  const employeeSnapshot: QuerySnapshot<DocumentData> = await getDocs(
    employeeQuery
  );
  const employeeDoc = employeeSnapshot.docs[0];

  if (!employeeDoc) {
    return res.status(404).json("Empleado no encontrado");
  }
  await updateDoc(doc(firestore, "employee", employeeDoc.id), {
    enabled: false,
  });

  return res.status(200).json("Empleado desabilitado");
}
