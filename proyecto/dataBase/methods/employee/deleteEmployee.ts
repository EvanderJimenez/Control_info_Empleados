import { firestore } from "../../../dataBase/firebase/firebase";
import {
  doc,
  updateDoc,
  DocumentData,
} from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DocumentData>
) {
  const { cedula } = req.query;

  console.log("cdedula: "+cedula)

  try {
    const employeeDoc = doc(firestore, "empleados", cedula as string);
    await updateDoc(employeeDoc, { habilitado: false });

    res.status(200).json({ message: "Empleado deshabilitado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al deshabilitar el empleado" });
  }
}
