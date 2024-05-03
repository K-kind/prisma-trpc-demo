import { Article } from "@/features/articles/models/article";
import { respondError } from "@/lib/apiUtils";
import { prisma } from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  article: Article | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "GET") return respondError(res, "Invalid request", 422);
  if (typeof req.query.id !== "string") {
    return respondError(res, "Invalid id", 422);
  }

  const article = await prisma.article.findFirst({
    where: { id: Number(req.query.id) },
  });
  res.status(200).json({ article });
}
