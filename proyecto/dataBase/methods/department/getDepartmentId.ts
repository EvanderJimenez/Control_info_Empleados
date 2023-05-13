import { firestore } from "../../firebase/firebase";
import { doc, getDoc, DocumentData } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";

interface Department {
  idDoc: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Department | string>
) {
  const { id } = req.body;
  console.log(id);
  const departmentDocRef = doc(firestore, "departments", id);
  const departmentDocSnapshot = await getDoc(departmentDocRef);

  if (!departmentDocSnapshot.exists()) {
    return res.status(404).json("Document not found");
  }

  const department = departmentDocSnapshot.data() as Department;
  return res.status(200).json(department);
}
