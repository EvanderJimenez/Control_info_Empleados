import { firestore } from "../../../dataBase/firebase/firebase";
import {
  collection,
  addDoc,
  getDoc,
  DocumentData,
} from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DocumentData>
) {
  // crear un nuevo documento en la colección "empleados"
  const {
    cedula,
    contrasena,
    correo,
    departamentoEmp,
    habilitado,
    jefe,
    nombre,
    puesto,
    sueldo,
  } = req.body;

  const newDocRef = await addDoc(collection(firestore, "empleados"), {
    cedula,
    contrasena,
    correo,
    departamentoEmp,
    habilitado,
    jefe,
    nombre,
    puesto,
    sueldo,
  });

  const newDoc = await getDoc(newDocRef);

  if (newDoc.exists()) {
    res.status(201).json(newDoc.data());
  } else {
    res.status(404).json({ message: "Documento no encontrado" });
  }
}

