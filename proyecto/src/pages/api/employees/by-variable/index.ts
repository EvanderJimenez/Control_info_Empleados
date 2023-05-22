import employeeProvider from "../../../../dataBase/firebase/providers/employee/employee.provider";
import { notAllowedResponse } from "../../../../root/api/reponses/notAllowedResponse";
import { NextApiRequest, NextApiResponse } from "next";

const getByVariable = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const {data,variable } = req.body

  try {
    const employee = await employeeProvider.getByVariable(data, variable);

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
