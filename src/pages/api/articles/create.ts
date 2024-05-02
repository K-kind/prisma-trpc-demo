import {
  Article,
  ArticleCreateParams,
} from "@/features/articles/models/article";
import { returnJsonError } from "@/lib/apiUtils";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  article: Article;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (
    req.method !== "POST" ||
    req.headers["content-type"] !== "application/json"
  ) {
    returnJsonError(res, "Invalid request", 422);
  }
  if (!isValidBody(req.body)) returnJsonError(res, "Invalid body", 422);

  res.status(200).json({ article: { id: 1, ...req.body } });
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
