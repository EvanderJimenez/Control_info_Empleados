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
  
  const employeeCollection = collection(firestore, "employee");
  const employeeSnapshot: QuerySnapshot<DocumentData> = await getDocs(
    employeeCollection
  );
  const emploeyees: DocumentData[] = employeeSnapshot.docs.map((doc) =>
    doc.data()
  );

  res.status(200).json(emploeyees);
}
