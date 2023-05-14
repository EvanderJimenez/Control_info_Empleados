import { NextApiRequest, NextApiResponse } from "next";
import { notAllowedResponse } from "../../../root/api/reponses/notAllowedResponse";
import brandsProvider from "@/dataBase/firebase/providers/brands/brands.provider";

const getAll = async (res: NextApiResponse) => {
    try {
      const brands = await brandsProvider.getAll();
      res.status(200).json(brands);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  };

  

  const handlers: any = {};
handlers["GET"] = (_req: NextApiRequest, res: NextApiResponse) => getAll(res);

export default async function brandsController(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  const handler = handlers[method as keyof typeof handlers](req, res);
  return handler! || notAllowedResponse(res, method!);
}
