import { departmentProvider } from "../../../dataBase/firebase/providers/departments/departments.provider";
import { notAllowedResponse } from "../../../root/api/reponses/notAllowedResponse";
import { NextApiRequest, NextApiResponse } from "next";

async function getDocId(req: NextApiRequest, res: NextApiResponse) {
  const id = String(req.query.id);
  try {
    const employee = await departmentProvider.getByDocId(id);
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

async function updateId(req: NextApiRequest, res: NextApiResponse) {
  try {
    const uid = String(req.query.id);

    const {
      id,
      name,
      size,
      location,
      idEmployee,
      leader,
      level,
      subDepartment,
      employees,
    } = req.body;

    await departmentProvider.updateById(
      id,
      name,
      size,
      location,
      idEmployee,
      leader,
      level,
      subDepartment,
      employees
    );
    res.status(200).json({ uid, message: "Information updated" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

const handlers: any = {};
handlers["GET"] = (req: NextApiRequest, res: NextApiResponse) =>
  getDocId(req, res);
handlers["PUT"] = (req: NextApiRequest, res: NextApiResponse) =>
  updateId(req, res);

export default function employeesByIdController(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  const handler = handlers[method as keyof typeof handlers](req, res);
  return handler! || notAllowedResponse(res, method!);
}
