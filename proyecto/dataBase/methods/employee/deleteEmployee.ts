import { firestore } from "../../firebase/firebase";
import { collection, query, where, getDocs, DocumentData, QuerySnapshot, updateDoc, doc } from "firebase/firestore";
import { NextApiResponse } from "next";

export default async function deleteEmployee(correo: string, res: NextApiResponse<any>) {
  const empleadosCollection = collection(firestore, "empleados");
  const empleadosQuery = query(empleadosCollection, where("correo", "==", correo));
  const empleadosSnapshot: QuerySnapshot<DocumentData> = await getDocs(empleadosQuery);
  const empleadoDoc = empleadosSnapshot.docs[0];

  if (!empleadoDoc) {
    return res.status(404).json("Empleado no encontrado");
  }
  await updateDoc(doc(firestore, "empleados", empleadoDoc.id), {
    habilitado: false,
  });

  return res.status(200).json("Empleado desabilitado");
}
