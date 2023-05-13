import { firestore } from "../../firebase/firebase";
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
    level,
    mainDepartment,
    subDepartment,
    employees,
  } = req.body;

  try {
    const departmentRef = collection(firestore, "departments");

    const q = query(departmentRef, where("name", "==", name));

    const querySnapshot = await getDocs(q);

    if (querySnapshot.size > 0) {
      const employeeDoc = doc(
        firestore,
        "departments",
        querySnapshot.docs[0].id
      );

      await updateDoc(employeeDoc, {
        name,
        size,
        location,
        area,
        leader,
        level,
        mainDepartment,
        subDepartment,
        employees,
      });

      res.status(200).json({ message: "Successfully updated department" });
    } else {
      res.status(404).json({ message: "Document not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating department" });
  }
}
