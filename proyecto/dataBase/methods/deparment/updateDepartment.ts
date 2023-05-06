import { firestore } from "../../../dataBase/firebase/firebase";
import {
  doc,
  collection,
  updateDoc,
  DocumentData,
  getDoc,
} from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import { useState } from "react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DocumentData>
) {
  const {
    id,
    size,
    location,
    area,
    leader,
    skills,
    mainDepartment,
    subDepartment,
  } = req.body;

  try {
    const docRef = doc(firestore, "deparments", id);
    const docSnapshot = await getDoc(docRef);
    // docSnapshot.data();

    if (docSnapshot.exists()) {
      await updateDoc(docRef, {
        size,
        location,
        area,
        leader,
        skills,
        mainDepartment,
        subDepartment,
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
