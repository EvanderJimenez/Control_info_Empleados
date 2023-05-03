import { firestore} from "../../../dataBase/firebase/firebase";
import {
  doc,
  collection,
  query,
  where,
  updateDoc,
  DocumentData,
  getDocs
} from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DocumentData>
) {
  const { cedula, contrasena, correo, departamentoEmp, habilitado, jefe, nombre, puesto, sueldo } = req.body;

  try {
    const employeesRef = collection(firestore, "empleados");
    const q = query(employeesRef, where("cedula", "==", cedula));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.size > 0) {
      const employeeDoc = doc(firestore, "empleados", querySnapshot.docs[0].id);
      console.log("Cédula: " + cedula);
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

      res.status(200).json({ message: "Empleado actualizado correctamente" });
    } else {
      res.status(404).json({ message: "Empleado no encontrado" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el empleado" });
  }
}
