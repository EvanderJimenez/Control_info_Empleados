
import { employeeProvider } from "@/dataBase";
import { notAllowedResponse } from "@/root/api";

import { NextApiRequest, NextApiResponse } from "next";

async function getEmployeesByIdDepartment(req: NextApiRequest, res: NextApiResponse) {
  const idDepartment = String(req.query.idDepartment);
  try {
    const employee = await employeeProvider.getEmployeesByIdDepartment(idDepartment);
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

const handlers: any = {};//TODO: Type all variables that you use
handlers["GET"] = (req: NextApiRequest, res: NextApiResponse) =>
getEmployeesByIdDepartment(req, res);

  export default function employeesByCedulaController(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
  
    const handler = handlers[method as keyof typeof handlers](req, res);
    return handler! || notAllowedResponse(res, method!);
  }