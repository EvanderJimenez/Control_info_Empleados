import { NextApiRequest, NextApiResponse } from "next";
import { notAllowedResponse } from "../../../root/api/reponses/notAllowedResponse";
import employeeProvider from "../../../dataBase/firebase/providers/employee/getEmployees";

const getAll = async (res: NextApiResponse) => {
  try {
    const employees = await employeeProvider.getAll();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
const handlers: any = {};
handlers["GET"] = (_req: NextApiRequest, res: NextApiResponse) => getAll(res);

export default async function employeesController(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  const handler = handlers[method as keyof typeof handlers](req, res);
  return handler! || notAllowedResponse(res, method!);
}
