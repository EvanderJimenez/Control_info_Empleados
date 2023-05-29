import { brandsProvider } from "@/dataBase";
import { notAllowedResponse } from "@/root/api";
import { NextApiRequest, NextApiResponse } from "next";


const getAll = async (res: NextApiResponse) => {
  try {
    const departments = await brandsProvider.getAllBrands();
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

const create = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { idEmployee, cycle, hoursEmployee } = req.body;

    console.log("idEmployee: " + idEmployee + " cycle: " + cycle + " hoursEmployee: " + hoursEmployee);

    const newBrands = await brandsProvider.createBrands(
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
