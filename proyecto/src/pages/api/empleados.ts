import { NextApiRequest, NextApiResponse } from "next";
import getEmployees from "../../../dataBase/methods/employee/getEmployees";
import createEmployee from "../../../dataBase/methods/employee/createEmployee";
import deleteEmployee from "../../../dataBase/methods/employee/deleteEmployee";
import upDateEmployee from "../../../dataBase/methods/employee/upDateEmploye";
import getEmployeByEmailPass from "../../../dataBase/methods/employee/getEmployeByEmailPass";
import authentication from "../../../dataBase/methods/employee/authentication";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {


  console.log("Controller: " + req.body.email);

  const email = req.body.email;

  if (req.method === "GET") {
    await getEmployees(req, res);
  } else if (req.method === "POST") {
    await authentication(req, res);
    //await upDateEmployee(req, res);
  } else if (req.method === "PUT") {
    await getEmployeByEmailPass(req,res)
   
    //await deleteEmployee(email, res);
  }else if(req.method === "DELETE"){
    //await deleteEmployee(req.body.email, res);
  } else {
    res.status(405).json({ message: "Método no permitido" });
  }
}
