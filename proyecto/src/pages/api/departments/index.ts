import { departmentProvider } from "@/dataBase";
import { notAllowedResponse } from "@/root/api";
import { HandlerFunction } from "@/root/types/HandlerFunction.type";
import { NextApiRequest, NextApiResponse } from "next";

const getAll = async (res: NextApiResponse) => {
  try {
    const departments = await departmentProvider.getAll();
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

const create = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {
      name,
      size,
      location,
      idEmployee,
      leader,
      level,
      subDepartment,
      namesubDepartment,
      employees,
    } = req.body;

    const departmentExists = await departmentProvider.checkIfNameExists(name);

    if (departmentExists) {
      return res
        .status(400)
        .json({ message: "Department name already exists" });
    }

    const newDepartment = await departmentProvider.create(
      name,
      size,
      location,
      idEmployee,
      leader,
      level,
      namesubDepartment,
      subDepartment,
      employees
    );
    res.status(201).json(newDepartment);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

const handlers:  { [key: string]: HandlerFunction } = {};//TODO: Type all variables that you use
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
