import type { NextApiRequest, NextApiResponse } from "next";

import {
  Article,
  ArticleCreateParams,
} from "@/features/articles/models/article";
import { respondError } from "@/lib/apiUtils";
import { prisma } from "@/lib/prisma";

type Data = {
  article: Article;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (
    req.method !== "POST" ||
    req.headers["content-type"] !== "application/json"
  ) {
    return respondError(res, "Invalid request", 422);
  }
  if (!isValidBody(req.body)) return respondError(res, "Invalid body", 422);

  const article = await prisma.article.create({ data: { ...req.body } });
  res.status(201).json({ article });
}

const isValidBody = (body: unknown): body is ArticleCreateParams => {
  if (body == null || typeof body !== "object") return false;

  const objectBody = body as Record<string, unknown>;
  if (objectBody.title == null || typeof objectBody.title !== "string") {
    return false;
  }
  if (objectBody.content == null || typeof objectBody.content !== "string") {
    return false;
  }
  return true;
};
