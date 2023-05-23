import { NextApiRequest, NextApiResponse } from "next";
import { notAllowedResponse } from "../../../root/api/reponses/notAllowedResponse";
import departmentProvider from "../../../dataBase/firebase/providers/brands/brands.provider";

const getAll = async (res: NextApiResponse) => {
  try {
    const departments = await departmentProvider.getAllBrands();
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

const create = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { idEmployee, cycle, hoursEmployee } = req.body;

    const newBrands = await departmentProvider.createBrands(
      idEmployee,
      cycle,
      hoursEmployee
    );
    res.status(201).json(newBrands);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

const handlers: any = {};
handlers["GET"] = (_req: NextApiRequest, res: NextApiResponse) => getAll(res);
handlers["POST"] = (req: NextApiRequest, res: NextApiResponse) =>
  create(req, res);

export default async function brandsController(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  const handler = handlers[method as keyof typeof handlers](req, res);
  return handler! || notAllowedResponse(res, method!);
}
