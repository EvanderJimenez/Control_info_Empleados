import { firestore } from "../../../dataBase/firebase/firebase";
import {
  doc,
  collection,
  query,
  where,
  updateDoc,
  DocumentData,
  getDocs,
} from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";

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
    skills,
    mainDepartment,
    subDepartment,
    empleados,
  } = req.body;

  try {
    const employeesRef = collection(firestore, "deparments");

    const q = query(employeesRef, where("name", "==", name));

    const querySnapshot = await getDocs(q);

    if (querySnapshot.size > 0) {
      const employeeDoc = doc(
        firestore,
        "deparments",
        querySnapshot.docs[0].id
      );

      await updateDoc(employeeDoc, {
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

      res
        .status(200)
        .json({ message: "Departamento actualizado correctamente" });
    } else {
      res.status(404).json({ message: "Departamento no encontrado" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el departamento" });
  }
}
