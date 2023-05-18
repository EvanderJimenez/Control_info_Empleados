import { NextApiRequest, NextApiResponse } from "next";
import { notAllowedResponse } from "../../../root/api/reponses/notAllowedResponse";//TODO:You should use relative paths with @
import departmentProvider from "../../../dataBase/firebase/providers/departments/departments.provider";

const getAll = async (res: NextApiResponse) => {
  try {//TODO: use only try catch in special cases and in the controllers or interfaces, because it is redundant and not clean code
    const departments = await departmentProvider.getAll();
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

const create = async (req: NextApiRequest, res: NextApiResponse) => {
  try {//TODO: use only try catch in special cases and in the controllers or interfaces, because it is redundant and not clean code
    const {
      name,
      size,
      location,
      idEmployee,
      leader,
      level,
      subDepartment,
      employees,
    } = req.body;

    const newDepartment = await departmentProvider.create(
      name,
      size,
      location,
      idEmployee,
      leader,
      level,
      subDepartment,
      employees
    );
    res.status(201).json(newDepartment);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

const handlers: any = {};
handlers["GET"] = (_req: NextApiRequest, res: NextApiResponse) => getAll(res);
handlers["POST"] = (req: NextApiRequest, res: NextApiResponse) =>
  create(req, res);

export default async function departmentController(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  const handler = handlers[method as keyof typeof handlers](req, res);
  return handler! || notAllowedResponse(res, method!);
}
