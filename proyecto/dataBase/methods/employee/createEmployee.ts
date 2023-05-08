import { firestore } from "../../../dataBase/firebase/firebase";
import {Schedule} from "../../../src/root/components/listEmployee/ListEmployee"
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
  
  const {
    uid,
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
    schedule
  } = req.body;

  const newDocRef = await addDoc(collection(firestore, "employee"), {
    uid,
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
    schedule: schedule.map((s: Schedule) => ({ day: s.day, startTime: s.startTime, endTime: s.endTime })),

  });

  const newDoc = await getDoc(newDocRef);

  if (newDoc.exists()) {
    res.status(201).json(newDoc.data());
  } else {
    res.status(404).json({ message: "Documento no encontrado" });
  }
}

