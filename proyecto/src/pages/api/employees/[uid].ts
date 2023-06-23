import { employeeProvider } from "@/dataBase";
import { notAllowedResponse } from "@/root/api";
import { NextApiRequest, NextApiResponse } from "next";

async function getByUid(req: NextApiRequest, res: NextApiResponse) {
  const uid = String(req.query.uid);
 //TODO: use only try catch in special cases and in the controllers or interfaces, because it is redundant and not clean code
    const employee = await employeeProvider.getByUid(uid);
    res.status(200).json(employee);

}

async function deleteByUid(req: NextApiRequest, res: NextApiResponse) {
  const uid = String(req.query.uid);
//TODO: use only try catch in special cases and in the controllers or interfaces, because it is redundant and not clean code
    await employeeProvider.deleteByUid(uid);
    res.status(200).json({ uid, message: "Information deleted" });

}

async function updateByUid(req: NextApiRequest, res: NextApiResponse) {
  try {
    const uid = String(req.query.uid);
    const employeeData = req.body;

    const employee = await employeeProvider.updateByUid(uid, employeeData);

    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}


async function uploadFile(req: NextApiRequest, res: NextApiResponse) {
  try {
    const uid = String(req.query.uid);
    const {file,nameFile,typeFile} = req.body;
   
    const employee = await employeeProvider.uploadFile(file, uid,nameFile, typeFile);

    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}


const handlers: any = {};//TODO: Type all variables that you use
handlers["GET"] = (req: NextApiRequest, res: NextApiResponse) =>
  getByUid(req, res);
handlers["DELETE"] = (req: NextApiRequest, res: NextApiResponse) =>
  deleteByUid(req, res);
handlers["PUT"] = (req: NextApiRequest, res: NextApiResponse) =>
  updateByUid(req, res);
  handlers["POST"] = (req: NextApiRequest, res: NextApiResponse) =>
  uploadFile(req, res);
export default function employeesByIdController(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  const handler = handlers[method as keyof typeof handlers](req, res);
  return handler! || notAllowedResponse(res, method!);
}
