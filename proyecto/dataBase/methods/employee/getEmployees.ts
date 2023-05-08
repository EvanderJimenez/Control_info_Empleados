import { firestore } from "../../firebase/firebase";
import { collection, getDocs, DocumentData, QuerySnapshot } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<DocumentData[]>) {
  const empleadosCollection = collection(firestore, "empleados");
  const empleadosSnapshot: QuerySnapshot<DocumentData> = await getDocs(empleadosCollection);
  const empleados: DocumentData[] = empleadosSnapshot.docs.map((doc) => doc.data());

  res.status(200).json(empleados);
}
