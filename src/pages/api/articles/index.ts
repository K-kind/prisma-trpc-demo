import { Article } from "@/features/articles/models/article";
import { respondError } from "@/lib/apiUtils";
import { parseNumber, parseString } from "@/utils/parseTypes";
import { prisma } from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { calcOffset } from "@/utils/pagination";

export type ArticleListQuery = {
  page?: string;
  per?: string;
  keyword?: string;
};

export type ArticleListResponseData = {
  articles: Article[];
  total: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ArticleListResponseData>
) {
  if (req.method !== "GET") return respondError(res, "Invalid request", 422);

  const query = parseQuery(req.query);
  const skip = calcOffset({ page: query.page, per: query.per });
  const keyword = query.keyword;
  const where = keyword
    ? {
        OR: [
          { title: { contains: keyword } },
          { content: { contains: keyword } },
        ],
      }
    : undefined;
  const [articles, total] = await prisma.$transaction([
    prisma.article.findMany({
      where,
      take: query.per,
      skip,
    }),
    prisma.article.count({ where }),
  ]);
  res.status(200).json({ articles, total });
}

const MAX_PER = 100;

const parseQuery = (rawQuery: unknown) => {
  const defaultQuery = { page: 1, per: 10, keyword: undefined };
  if (rawQuery == null || typeof rawQuery !== "object") return defaultQuery;

  const query = rawQuery as Record<string, unknown>;
  const page = parseNumber(query.page) ?? defaultQuery.page;
  const parsedPer = parseNumber(query.per);
  const per = parsedPer && parsedPer <= MAX_PER ? parsedPer : defaultQuery.per;
  const keyword = parseString(query.keyword);
  return { page, per, keyword };
};
