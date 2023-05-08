import { firestore } from "../../firebase/firebase";
import { collection, query, where, getDocs, DocumentData, QuerySnapshot } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";

interface Employee {
  email: string;
  password: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Employee | string>
) {
  const { email, password } = req.body;


  const empleadosCollection = collection(firestore, "employee");
  const employeeQuery = query(
    empleadosCollection,
    where("email", "==", email),
    where("password", "==", password)
  );
  const employyeSnapshot: QuerySnapshot<DocumentData> = await getDocs(
    employeeQuery
  );
  const employeeDoc = employyeSnapshot.docs[0];

  if (!employeeDoc) {
    return res.status(401).json("Credenciales inválidas");
  }
  
  const employeeData = employeeDoc.data() as Employee;

  console.log("Updated employee" + employeeData)

  return res.status(200).json(employeeData);
}
