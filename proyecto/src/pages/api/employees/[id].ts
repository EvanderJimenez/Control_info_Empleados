import { NextApiRequest, NextApiResponse } from "next";
import { notAllowedResponse } from "../../../root/api/reponses/notAllowedResponse";
import employeeProvider from "../../../../dataBase/firebase/providers/employee/getEmployees";

async function getByUid(req:NextApiRequest,res: NextApiResponse) {

    const uid = "0"

   
    try {
        const employee = await employeeProvider.getByUid(uid);
        res.status(200).json(employee)
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }

}

const handlers: any = {};
handlers["GET"] = (req: NextApiRequest, res: NextApiResponse) => getByUid(req, res);

export default function authorsByIdController(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
  
  
    const handler = handlers[method as keyof typeof handlers](req,res);
    return handler! || notAllowedResponse(res, method!);
  }