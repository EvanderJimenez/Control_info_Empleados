import { employeeProvider } from "@/dataBase";
import { notAllowedResponse } from "@/root/api";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "../../../../root/utils/jwt";
import { isEmail } from "@/root/utils/predicates/Predicates";

const getByEmailPassword = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  if (isEmail(email)) {
    try {
      const employee = await employeeProvider.login(email, password);
      const token = jwt.signToken(email, password);
      res.status(200).json({ employee, token });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
};

const handlers: any = {};
handlers["POST"] = (req: NextApiRequest, res: NextApiResponse) => getByEmailPassword(req, res);

export default function employeeByEmailPasswordController(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  const handler = handlers[method as keyof typeof handlers](req, res);
  return handler! || notAllowedResponse(res, method!);
}
