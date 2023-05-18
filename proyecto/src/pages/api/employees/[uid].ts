import employeeProvider from "../../../dataBase/firebase/providers/employee/employee.provider";
import { notAllowedResponse } from "../../../root/api/reponses/notAllowedResponse";//TODO:You should use relative paths with @
import { NextApiRequest, NextApiResponse } from "next";

async function getByUid(req: NextApiRequest, res: NextApiResponse) {
  const uid = String(req.query.uid);
  try {//TODO: use only try catch in special cases and in the controllers or interfaces, because it is redundant and not clean code
    const employee = await employeeProvider.getByUid(uid);
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

async function deleteByUid(req: NextApiRequest, res: NextApiResponse) {
  const uid = String(req.query.uid);
  try {//TODO: use only try catch in special cases and in the controllers or interfaces, because it is redundant and not clean code
    await employeeProvider.deleteByUid(uid);
    res.status(200).json({ uid, message: "Information deleted" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

async function updateByUid(req: NextApiRequest, res: NextApiResponse) {
  try {//TODO: use only try catch in special cases and in the controllers or interfaces, because it is redundant and not clean code

    const uid = String(req.query.uid);

    const {
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
    } = req.body;

    await employeeProvider.updatByUid(
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
      schedule
    );
    res.status(200).json({ uid, message: "Information updated" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

const handlers: any = {};
handlers["GET"] = (req: NextApiRequest, res: NextApiResponse) =>
  getByUid(req, res);
handlers["DELETE"] = (req: NextApiRequest, res: NextApiResponse) =>
  deleteByUid(req, res);
handlers["PUT"] = (req: NextApiRequest, res: NextApiResponse) =>
  updateByUid(req, res);

export default function employeesByIdController(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  const handler = handlers[method as keyof typeof handlers](req, res);
  return handler! || notAllowedResponse(res, method!);
}
