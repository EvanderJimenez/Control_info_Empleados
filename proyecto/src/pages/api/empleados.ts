import { NextApiRequest, NextApiResponse } from "next";
import getEmployees from "../../dataBase/firebase/providers/employee/getEmployees";
import createEmployee from "../../dataBase/firebase/providers/employee/createEmployee";
import deleteEmployee from "../../dataBase/firebase/providers/employee/deleteEmployee";
import upDateEmployee from "../../dataBase/firebase/providers/employee/upDateEmploye";
import getEmployeByEmailPass from "../../dataBase/firebase/providers/employee/getEmployeByEmailPass";
import authentication from "../../dataBase/firebase/providers/employee/authentication";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {


  console.log("Controller: " + req.body.email);

  const email = req.body.email;

  if (req.method === "GET") {
   
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
