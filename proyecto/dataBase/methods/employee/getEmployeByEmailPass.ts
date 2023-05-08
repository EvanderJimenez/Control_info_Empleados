import { firestore } from "../../firebase/firebase";
import { collection, query, where, getDocs, DocumentData, QuerySnapshot } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";

interface Empleado {
  email: string;
  password: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Empleado | string>) {
  const { correo, contrasena } = req.body;

  const empleadosCollection = collection(firestore, "empleados");
  const empleadosQuery = query(empleadosCollection, where("correo", "==", correo), where("contrasena", "==", contrasena));
  const empleadosSnapshot: QuerySnapshot<DocumentData> = await getDocs(empleadosQuery);
  const empleadoDoc = empleadosSnapshot.docs[0];

  if (!empleadoDoc) {
    return res.status(401).json("Credenciales inválidas");
  }

  const empleadoData = empleadoDoc.data() as Empleado;
  return res.status(200).json(empleadoData);
}
