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
  // obtener el identificador del empleado y los datos a actualizar del cuerpo de la solicitud
  const { employeeId } = req.query;
  const { cedula, contrasena, correo, departamentoEmp, habilitado, jefe, nombre, puesto, sueldo } = req.body;

  try {
    // actualizar el documento del empleado en Firestore con los nuevos datos
    const employeeDoc = doc(firestore, "empleados", employeeId as string);
    await updateDoc(employeeDoc, {
      cedula,
      contrasena,
      correo,
      departamentoEmp,
      habilitado,
      jefe,
      nombre,
      puesto,
      sueldo
    });

    // enviar una respuesta de éxito con un estado HTTP 200 y un mensaje de confirmación
    res.status(200).json({ message: "Empleado actualizado correctamente" });
  } catch (error) {
    // enviar una respuesta de error con un estado HTTP 500 y un mensaje de error
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el empleado" });
  }
}
