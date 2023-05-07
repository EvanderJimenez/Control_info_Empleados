import { firestore } from "../../firebase/firebase";
import { doc, getDoc, DocumentData } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";

interface Deparment {
  idDoc: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Deparment | string>
) {
  const { id } = req.body;
  console.log(id);
  const departmentDocRef = doc(firestore, "deparments", id);
  const departmentDocSnapshot = await getDoc(departmentDocRef);

  if (!departmentDocSnapshot.exists()) {
    return res.status(404).json("Documento no encontrado");
  }

  const department = departmentDocSnapshot.data() as Deparment;
  return res.status(200).json(department);
}
