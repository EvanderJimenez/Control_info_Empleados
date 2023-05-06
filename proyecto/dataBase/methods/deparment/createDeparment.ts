import { firestore } from "../../firebase/firebase";
import { collection, addDoc, getDoc, DocumentData } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DocumentData>
) {
  // crear un nuevo documento en la colección "deparment"
  const {
    name,
    size,
    location,
    area,
    leader,
    skills,
    mainDepartment,
    subDepartment,
  } = req.body;

  const newDocRefD = await addDoc(collection(firestore, "deparments"), {
    name,
    size,
    location,
    area,
    leader,
    skills,
    mainDepartment,
    subDepartment,
  });

  const newDoc = await getDoc(newDocRefD);

  if (newDoc.exists()) {
    res.status(201).json(newDoc.data());
  } else {
    res.status(404).json({ message: "Documento no encontrado" });
  }
}
