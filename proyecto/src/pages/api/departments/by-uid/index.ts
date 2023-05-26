import { NextApiRequest, NextApiResponse } from "next";
import { notAllowedResponse } from "../../../../root/api/reponses/notAllowedResponse";
import departmentProvider from "../../../../dataBase/firebase/providers/departments/departments.provider";

const getDepartmentByUidEmployee = async (res: NextApiResponse) => {
  try {
    const departments = await departmentProvider.getDepartmentByUidEmployee();
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

const handlers: any = {};
handlers["GET"] = (_req: NextApiRequest, res: NextApiResponse) => getDepartmentByUidEmployee(res);

export default async function departmentController(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    const { method } = req;
  
    const handler = handlers[method as keyof typeof handlers](req, res);
    return handler! || notAllowedResponse(res, method!);
  }
  