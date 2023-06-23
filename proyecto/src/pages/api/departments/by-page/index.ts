import { NextApiRequest, NextApiResponse } from "next";
import { departmentProvider } from "@/dataBase";
import { notAllowedResponse } from "@/root/api";
import { HandlerFunction } from "@/root/types/HandlerFunction.type";

const getDepartmentPage = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const pageSize = Number(req.query.pageSize);
    const currentPage = Number(req.query.currentPage);
    const departments = await departmentProvider.getDepartmentsByPage(
      pageSize,
      currentPage
    );
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
const handlers:  { [key: string]: HandlerFunction } = {};//TODO: Type all variables that you use
handlers["GET"] = (req: NextApiRequest, res: NextApiResponse) =>
  getDepartmentPage(req, res);

export default function departmentsByIdController(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  const handler = handlers[method as keyof typeof handlers](req, res);
  return handler! || notAllowedResponse(res, method!);
}
