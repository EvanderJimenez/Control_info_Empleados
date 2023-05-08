import { firestore } from "../../firebase/firebase";
import { collection, addDoc, getDoc, DocumentData } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const storage = getStorage();
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
    empleados,
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
    empleados,
  });

  const newDoc = await getDoc(newDocRefD);

  if (newDoc.exists()) {
    res.status(201).json(newDoc.data());
  } else {
    res.status(404).json({ message: "Documento no encontrado" });
  }
}
