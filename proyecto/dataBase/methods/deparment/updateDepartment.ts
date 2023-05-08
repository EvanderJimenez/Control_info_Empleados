import { firestore } from "../../../dataBase/firebase/firebase";
import {
  updateDoc,
  query,
  where,
  getDocs,
  collection,
  doc,
} from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // obtener el nombre del departamento y los datos a actualizar del cuerpo de la solicitud
    const { departmentName } = req.query;
    const {
      size,
      location,
      area,
      leader,
      skills,
      mainDepartment,
      subDepartment,
      nivel,
    } = req.body;

    // realizar una consulta en Firestore para obtener el documento que corresponde al departamento con el nombre dado
    const departmentsCollectionRef = collection(firestore, "deparments"); // fix typo
    const departmentQuery = query(
      departmentsCollectionRef,
      where("name", "==", departmentName)
    );
    const departmentQuerySnapshot = await getDocs(departmentQuery);

    if (departmentQuerySnapshot.empty) {
      // Si la consulta no devuelve ningún documento, significa que no existe ningún departamento con el nombre dado.
      // En este caso, se debe enviar una respuesta de error.
      res.status(404).json({
        message: "No se encontró ningún departamento con el nombre dado.",
      });
    } else {
      // Si la consulta devuelve un documento, se puede actualizar ese documento con los nuevos datos.
      const departmentDoc = doc(
        firestore,
        "departments",
        departmentQuerySnapshot.docs[0].id
      );
      await updateDoc(departmentDoc, {
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
      res
        .status(200)
        .json({ message: "Departamento actualizado correctamente" });
    }
  } catch (error) {
    // enviar una respuesta de error con un estado HTTP 500 y un mensaje de error
    console.error(error);
    console.log(updateDoc);
    res.status(500).json({ message: "Error al actualizar el departamento" });
  }
}
