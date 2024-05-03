import {
  Article,
  ArticleCreateParams,
} from "@/features/articles/models/article";
import { respondError } from "@/lib/apiUtils";
import { prisma } from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  article: Article;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (
    req.method !== "PATCH" ||
    req.headers["content-type"] !== "application/json"
  ) {
    return respondError(res, "Invalid request", 422);
  }
  if (typeof req.query.id !== "string") {
    return respondError(res, "Invalid id", 422);
  }
  if (!isValidBody(req.body)) return respondError(res, "Invalid body", 422);

  const article = await prisma.article.update({
    where: { id: Number(req.query.id) },
    data: { ...req.body },
  });
  res.status(200).json({ article });
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