import { firestore } from "../../firebase/firebase";
import {
  collection,
  getDocs,
  DocumentData,
  QuerySnapshot,
} from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DocumentData[]>
) {
  // obtener todos los documentos de la colección "departments"
  const departmentsCollection = collection(firestore, "deparments");
  const departmentsSnapshot: QuerySnapshot<DocumentData> = await getDocs(
    departmentsCollection
  );

  const departments: DocumentData[] = departmentsSnapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });

  res.status(200).json(departments);
}
