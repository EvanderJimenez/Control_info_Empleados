import { NextApiRequest, NextApiResponse } from "next";
import getEmployees from "../../../dataBase/methods/employee/getEmployees";
import createEmployee from "../../../dataBase/methods/employee/createEmployee";
import deleteEmployee from "../../../dataBase/methods/employee/deleteEmployee"
import upDateEmployee from "../../../dataBase/methods/employee/upDateEmploye"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "GET") {
    await getEmployees(req, res);
  } else if (req.method === "POST") {
    await createEmployee(req, res);
  } else if(req.method === "DELETE") {
    console.log("estoy en el delete")
    await deleteEmployee(req, res);
  }else if(req.method === "PUT"){
    await upDateEmployee(req,res)
  } else {
    res.status(405).json({ message: "Método no permitido" });
  }
}
