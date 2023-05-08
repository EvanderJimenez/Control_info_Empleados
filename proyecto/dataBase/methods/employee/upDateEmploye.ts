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
import { Schedule } from "../../../src/root/components/listEmployee/ListEmployee";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DocumentData>
) {
  const {
    uid,
    option,
    name,
    firstSurname,
    secondSurname,
    cedula,
    phoneNumber,
    photo,
    jobPosition,
    salary,
    enabled,
    idDepartment,
    password,
    email,
    boss,
    schedule,
  } = req.body;

  try {
    const employeesRef = collection(firestore, "employee");

    const q = query(employeesRef, where("uid", "==", uid));
    
    const querySnapshot = await getDocs(q);

    if (querySnapshot.size > 0) {
      const employeeDoc = doc(firestore, "employee", querySnapshot.docs[0].id);

      await updateDoc(employeeDoc, {
        name,
        firstSurname,
        secondSurname,
        cedula,
        phoneNumber,
        photo,
        jobPosition,
        salary,
        enabled,
        idDepartment,
        password,
        email,
        boss,
        schedule: schedule.map((s: Schedule) => ({
          day: s.day,
          startTime: s.startTime,
          endTime: s.endTime,
        })),
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
