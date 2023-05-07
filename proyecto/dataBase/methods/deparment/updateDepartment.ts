import { firestore } from "../../../dataBase/firebase/firebase";
import { doc, updateDoc, DocumentData } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DocumentData>
) {
  // obtener el identificador del empleado y los datos a actualizar del cuerpo de la solicitud
  const { employeeId } = req.query;
  const {
    name,
    size,
    location,
    area,
    leader,
    skills,
    mainDepartment,
    subDepartment,
    nivel,
  } = req.body;

  try {
    const { departmentId } = req.query;
    const {
      name,
      size,
      location,
      area,
      leader,
      skills,
      mainDepartment,
      subDepartment,
      nivel,
    } = req.body;

    // actualizar el documento del departamento en Firestore con los nuevos datos
    const departmentDoc = doc(firestore, "deparments", departmentId as string);
    await updateDoc(departmentDoc, {
      name,
      size,
      location,
      area,
      leader,
      skills,
      mainDepartment,
      subDepartment,
      nivel,
    });

    // enviar una respuesta de éxito con un estado HTTP 200 y un mensaje de confirmación
    res.status(200).json({ message: "Empleado actualizado correctamente" });
  } catch (error) {
    // enviar una respuesta de error con un estado HTTP 500 y un mensaje de error
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el empleado" });
  }
}
