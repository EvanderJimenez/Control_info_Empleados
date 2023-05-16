import { NextApiRequest, NextApiResponse } from "next";
import { notAllowedResponse } from "../../../root/api/reponses/notAllowedResponse";
import employeeProvider from "../../../dataBase/firebase/providers/employee/employee.provider";

const getAll = async (res: NextApiResponse) => {
  try {
    const employees = await employeeProvider.getAll();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

const create = async (req: NextApiRequest, res: NextApiResponse) => {

  console.log("body" + JSON.stringify(req.body))

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
      brands
    } = req.body;

     console.log("email: " + email + " password: " + password + " uid: " + uid);

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
      brands
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
