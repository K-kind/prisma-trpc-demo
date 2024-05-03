import { Article } from "@/features/articles/models/article";
import { respondError } from "@/lib/apiUtils";
import { prisma } from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  articles: Article[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "GET") return respondError(res, "Invalid request", 422);

  const articles = await prisma.article.findMany({ take: 20 });
  res.status(200).json({ articles });
}
