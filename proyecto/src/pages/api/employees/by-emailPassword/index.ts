import employeeProvider from "../../../../dataBase/firebase/providers/employee/employee.provider";
import { notAllowedResponse } from "../../../../root/api/reponses/notAllowedResponse";//TODO:You should use relative paths with @
import { NextApiRequest, NextApiResponse } from "next";

const getByEmailPassword = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const {email,password } = req.body

  console.log("Eamil: ", email);//TODO: You should erase all console log
  console.log("password: ", password);//TODO: You should erase all console log
  try {//TODO: use only try catch in special cases and in the controllers or interfaces, because it is redundant and not clean code
    const employee = await employeeProvider.getByEmailPassword(email, password);
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

const handlers: any = {};
handlers["POST"] = (req: NextApiRequest, res: NextApiResponse) =>
  getByEmailPassword(req, res);

export default function employeeByEmailPasswordController(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  const handler = handlers[method as keyof typeof handlers](req, res);
  return handler! || notAllowedResponse(res, method!);
}
