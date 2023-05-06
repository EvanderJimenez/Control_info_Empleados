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

  

  if (req.method === "GET") {
    await getEmployees(req, res);
  } else if (req.method === "POST") {
    if(req.body.option) {
        await authentication(req, res);
    } else {
       // await createEmployee(req, res);
    }
}

   else if (req.method === "PUT") {
    console.log(req.body.correo)
    console.log(req.body.cedula)
    //await getEmployeByEmailPass(req,res)
    //await upDateEmployee(req, res);
    await deleteEmployee(req.body.correo, res);
  } else {
    res.status(405).json({ message: "Método no permitido" });
  }
}
