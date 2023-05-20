
import employeeProvider from "@/dataBase/firebase/providers/employee/employee.provider";
import { notAllowedResponse } from "@/root/api/reponses/notAllowedResponse";

import { NextApiRequest, NextApiResponse } from "next";

async function getByUid(req: NextApiRequest, res: NextApiResponse) {
  const cedula = String(req.query.cedula);
  try {
    const employee = await employeeProvider.getByCedula(cedula);
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

const handlers: any = {};
handlers["GET"] = (req: NextApiRequest, res: NextApiResponse) =>
  getByUid(req, res);

  export default function employeesByCedulaController(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
  
    const handler = handlers[method as keyof typeof handlers](req, res);
    return handler! || notAllowedResponse(res, method!);
  }