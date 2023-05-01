import { firestore } from "../../../dataBase/firebase/firebase";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  getDoc,
  DocumentData,
  QuerySnapshot,
} from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DocumentData | DocumentData[]>
) {
  if (req.method === "GET") {
    // obtener todos los documentos de la colección "usuarios"
    const usersCollection = collection(firestore, "empleados");
    const usersSnapshot: QuerySnapshot<DocumentData> = await getDocs(
      usersCollection
    );
    const users: DocumentData[] = usersSnapshot.docs.map((doc) => doc.data());

    res.status(200).json(users);
  } else if (req.method === "POST") {
    console.log("Entre al post");
    // crear un nuevo documento en la colección "usuarios"
    // crear un nuevo documento en la colección "usuarios"
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
    console.log(
      "Datos recibidos:",
      cedula,
      contrasena,
      correo,
      departamentoEmp,
      habilitado,
      jefe,
      nombre,
      puesto,
      sueldo
    );
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
}
