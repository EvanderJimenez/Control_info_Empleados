import { NextApiRequest, NextApiResponse } from "next";
import { employeeProvider } from "@/dataBase";
import { notAllowedResponse } from "@/root/api";
import { EmployeesType } from "@/root/types/Employee.type";
import { HandlerFunction } from "@/root/types/HandlerFunction.type";


const getAll = async (res: NextApiResponse) => {
  //TODO: use only try catch in special cases and in the controllers or interfaces, because it is redundant and not clean code
    const employees = await employeeProvider.getAll();
    res.status(200).json(employees);

};

const create = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const employeeData : EmployeesType = req.body;
  
    const newEmployee = await employeeProvider.create(employeeData);

    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};


const handlers:  { [key: string]: HandlerFunction } = {};//TODO: Type all variables that you use
handlers["GET"] = (_req: NextApiRequest, res: NextApiResponse) => getAll(res);
handlers["POST"] = (req: NextApiRequest, res: NextApiResponse) => create(req, res);



export default async function employeesController(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  const handler = handlers[method as keyof typeof handlers](req, res);
  return handler! || notAllowedResponse(res, method!);
}
