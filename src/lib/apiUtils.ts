import { NextApiResponse } from "next";

export const respondError = (
  res: NextApiResponse,
  message = "Internal server error",
  status = 500,
) => {
  res.status(status).json({ message });
};
