import { NextApiRequest, NextApiResponse } from "next";
import getDepartments from "../../../dataBase/methods/deparment/getDepartment";
import createDeparment from "../../../dataBase/methods/deparment/createDeparment";
import upDateDeparments from "../../../dataBase/methods/deparment/updateDepartment";
import getDepar from "../../../dataBase/methods/deparment/getDeparmentId";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "GET") {
    await getDepartments(req, res);
  } else if (req.method === "POST") {
    await createDeparment(req, res);
  } else if (req.method === "PUT") {
    console.log(req.body.name);
    await getDepar(req, res);
  } else if (req.method === "DELETE") {
    await upDateDeparments(req, res);
  } else {
    res.status(405).json({ message: "Método no permitido" });
  }
}
