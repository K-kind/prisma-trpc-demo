import { respondError } from "@/lib/apiUtils";
import { prisma } from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    return respondError(res, "Invalid request", 422);
  }
  if (typeof req.query.id !== "string") {
    return respondError(res, "Invalid id", 422);
  }

  await prisma.article.delete({
    where: { id: Number(req.query.id) },
  });
  res.status(200).json({});
}
