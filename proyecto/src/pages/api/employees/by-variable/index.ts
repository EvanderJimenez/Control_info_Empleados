import { employeeProvider } from "@/dataBase";
import { notAllowedResponse } from "@/root/api";
import { id } from "date-fns/locale";
import { NextApiRequest, NextApiResponse } from "next";

const getByVariable = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const {data,variable,idDepartment } = req.body

  try {
    const employee = await employeeProvider.getByVariable(data, variable,idDepartment);

    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

const handlers: any = {};
handlers["POST"] = (req: NextApiRequest, res: NextApiResponse) =>getByVariable(req, res);

export default function employeeByVariableController(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  const handler = handlers[method as keyof typeof handlers](req, res);
  return handler! || notAllowedResponse(res, method!);
}
