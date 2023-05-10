import employeeProvider from "../../../dataBase/firebase/providers/employee/getEmployees";
import { notAllowedResponse } from "../../../root/api/reponses/notAllowedResponse";
import { NextApiRequest, NextApiResponse } from "next";

async function getByUid(req: NextApiRequest, res: NextApiResponse) {
  const uid = String(req.query.uid);
  try {
    const employee = await employeeProvider.getByUid(uid);
    console.log(uid);
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

const handlers: any = {};
handlers["GET"] = (req: NextApiRequest, res: NextApiResponse) => getByUid(req, res);

export default function employeesByIdController(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  const handler = handlers[method as keyof typeof handlers](req, res);
  return handler! || notAllowedResponse(res, method!);
}
