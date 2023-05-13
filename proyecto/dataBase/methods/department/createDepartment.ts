import { firestore } from "../../firebase/firebase";
import { collection, addDoc, getDoc, DocumentData } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import { getStorage } from "firebase/storage";

const storage = getStorage();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DocumentData>
) {
  const {
    name,
    size,
    location,
    area,
    leader,
    level,
    mainDepartment,
    subDepartment,
    employees,
  } = req.body;

  const newDocRefD = await addDoc(collection(firestore, "departments"), {
    name,
    size,
    location,
    area,
    leader,
    level,
    mainDepartment,
    subDepartment,
    employees,
  });

  const newDoc = await getDoc(newDocRefD);

  if (newDoc.exists()) {
    res.status(201).json(newDoc.data());
  } else {
    res.status(404).json({ message: "Document not found" });
  }
}
