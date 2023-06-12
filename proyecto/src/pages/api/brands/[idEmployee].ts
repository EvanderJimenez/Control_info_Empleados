import { brandsProvider } from "@/dataBase";
import { notAllowedResponse } from "@/root/api";
import { NextApiRequest, NextApiResponse } from "next";

async function getDocByEmployeeId(req: NextApiRequest, res: NextApiResponse) {
  const idEmployee = String(req.query.idEmployee);
  try {
    const brand = await brandsProvider.getDocByEmployeeId(idEmployee);
    if (brand === null) {
      res.status(404).json({ message: "Not found" });
    } else {//TODO: remove the else statement because is not necesary
      res.status(200).json(brand);
    }
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
async function updateByUid(req: NextApiRequest, res: NextApiResponse) {
  try {
    const uid = String(req.query.idEmployee);

    const { idEmployee, cycle, hoursEmployee } = req.body;

    await brandsProvider.updateById(idEmployee, cycle, hoursEmployee);
    res.status(200).json({ uid, message: "Information updated" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
const handlers: any = {};//TODO: Type all variables that you use
handlers["GET"] = (req: NextApiRequest, res: NextApiResponse) =>
  getDocByEmployeeId(req, res);
handlers["PUT"] = (req: NextApiRequest, res: NextApiResponse) =>
  updateByUid(req, res);

export default function BrandByIdController(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  const handler = handlers[method as keyof typeof handlers](req, res);
  return handler! || notAllowedResponse(res, method!);
}
