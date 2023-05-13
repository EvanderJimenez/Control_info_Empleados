import { NextApiRequest, NextApiResponse } from "next";
import getDepartments from "../../../dataBase/methods/department/getDepartment";
import createDepartment from "../../../dataBase/methods/department/createDepartment";
import upDateDepartments from "../../../dataBase/methods/department/updateDepartment";
import getDepar from "../../../dataBase/methods/department/getDepartmentId";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "GET") {
    await getDepartments(req, res);
  } else if (req.method === "PUT") {
    await createDepartment(req, res);
  } else if (req.method === "POST") {
    console.log(req.body.name);
    await getDepar(req, res);
  } else if (req.method === "DELETE") {
    await upDateDepartments(req, res);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
