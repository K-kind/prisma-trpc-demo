import { NextApiResponse } from "next";

export const returnJsonError = (
  res: NextApiResponse,
  message = "Internal server error",
  status = 500
) => {
  res.status(status).json({ message });
};
