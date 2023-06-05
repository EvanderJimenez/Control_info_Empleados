import { departmentProvider } from "@/dataBase";
import { notAllowedResponse } from "@/root/api";
import { NextApiRequest, NextApiResponse } from "next";

async function getName(req: NextApiRequest, res: NextApiResponse) {
  const name = String(req.query.name);
  try {
    const employee = await departmentProvider.getName(name);
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
const handlers: any = {};
handlers["GET"] = (req: NextApiRequest, res: NextApiResponse) =>
  getName(req, res);

export default function departmentsByIdController(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  const handler = handlers[method as keyof typeof handlers](req, res);
  return handler! || notAllowedResponse(res, method!);
}
