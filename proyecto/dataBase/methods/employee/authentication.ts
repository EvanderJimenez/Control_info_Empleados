import { firestore, auth } from "../../../dataBase/firebase/firebase";
import { DocumentData } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse<DocumentData>) {
  const { correo, contrasena, option } = req.body;

  console.log(correo, contrasena, option);

  try {
    if (option === "register") {
      const userCredential = await createUserWithEmailAndPassword(auth, correo, contrasena);
      const user = userCredential.user;

      return res.status(201).json({ message: "Usuario creado correctamente", user });
    } else if (option === "login") {
      const signInMethods = await fetchSignInMethodsForEmail(auth, correo);
      if (signInMethods.length === 0) {
        return res.status(400).json({ message: "El correo electrónico no está registrado" });
      }

      const userCredential = await signInWithEmailAndPassword(auth, correo, contrasena);
      const user = userCredential.user;

      return res.status(200).json({ message: "Usuario autenticado correctamente", user });
    } else {
      return res.status(400).json({ message: "Opción no válida" });
    }
  } catch (error) {
    if (typeof error === "object" && error !== null && "code" in error && "message" in error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error al crear o autenticar usuario:", errorCode, errorMessage);
      return res.status(500).json({ message: "Error al crear o autenticar usuario" });
    }
    console.error("Error desconocido al crear o autenticar usuario:", error);
    return res.status(500).json({ message: "Error al crear o autenticar usuario" });
  }
}
