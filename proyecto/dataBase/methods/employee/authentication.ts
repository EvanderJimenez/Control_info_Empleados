import { firestore, auth } from "../../../dataBase/firebase/firebase";
import { DocumentData } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";

import { collection, addDoc, getDoc } from "firebase/firestore";
import { Schedule } from "../../../src/root/components/listEmployee/ListEmployee";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DocumentData>
) {
  const {
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
    if (option === "register") {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const uid = user.uid;

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
        schedule: schedule.map((s: Schedule) => ({
          day: s.day,
          startTime: s.startTime,
          endTime: s.endTime,
        })),
      });

      const newDoc = await getDoc(newDocRef);

      if (newDoc.exists()) {
        res.status(201).json(newDoc.data());
      } else {
        res.status(404).json({
          message: "Usuario y empleado creados correctamente",
          user,
          employee: newDoc.data(),
        });
      }
    } else if (option === "login") {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);

      if (signInMethods.length === 0) {
        return res
          .status(400)
          .json({ message: "El correo electrónico no está registrado" });
      }

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      return res
        .status(200)
        .json({ message: "Usuario autenticado correctamente", user });
    } else {
      return res.status(400).json({ message: "Opción no válida" });
    }
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      "message" in error
    ) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(
        "Error al crear o autenticar usuario:",
        errorCode,
        errorMessage
      );
      return res
        .status(500)
        .json({ message: "Error al crear o autenticar usuario" });
    }
    console.error("Error desconocido al crear o autenticar usuario:", error);
    return res
      .status(500)
      .json({ message: "Error al crear o autenticar usuario" });
  }
}
