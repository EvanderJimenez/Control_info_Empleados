import { NextApiRequest, NextApiResponse } from "next";
import getDepartments from "../../../dataBase/methods/deparment/getDepartment";
import createDeparment from "../../../dataBase/methods/deparment/createDeparment";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "GET") {
    await getDepartments(req, res);
  } else if (req.method === "POST") {
    await createDeparment(req, res);
  } else {
    res.status(405).json({ message: "Método no permitido" });
  }
}
