import { NextApiRequest, NextApiResponse } from "next";
import { employeeProvider } from "@/dataBase";
import { notAllowedResponse } from "@/root/api";


const getAll = async (res: NextApiResponse) => {
  try {
    const employees = await employeeProvider.getAll();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

const create = async (req: NextApiRequest, res: NextApiResponse) => {

  try {
    const {
      uid,
      name,
      firstSurname,
      secondSurname,
      cedula,
      phoneNumber,
      photo,
      jobPosition,
      salary,
      enabled,
      idDepartment,
      password,
      email,
      boss,
      schedule,
      vacations,
      attendance
    } = req.body;

    const newEmployee = await employeeProvider.create(
      uid,
      name,
      firstSurname,
      secondSurname,
      cedula,
      phoneNumber,
      photo,
      jobPosition,
      salary,
      enabled,
      idDepartment,
      password,
      email,
      boss,
      schedule,
      vacations,
      attendance
    );


    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

const handlers: any = {};
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
