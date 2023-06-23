import { NextApiRequest, NextApiResponse } from "next";

export type HandlerFunction = (req: NextApiRequest, res: NextApiResponse) => void;