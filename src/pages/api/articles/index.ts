import type { NextApiRequest, NextApiResponse } from "next";

import { Article } from "@/features/articles/models/article";
import { respondError } from "@/lib/apiUtils";
import { prisma } from "@/lib/prisma";
import { calcOffset } from "@/utils/pagination";
import { parseNumber, parseString } from "@/utils/parseTypes";

export const ARTICLE_LIST_SORTS = ["createdAt:asc", "createdAt:desc"] as const;

export type ArticleListQuery = {
  page?: string;
  per?: string;
  keyword?: string;
  /** "createdAt:asc,createdAt:desc" のような形 */
  sort?: string;
};

export type ArticleListResponseData = {
  articles: Article[];
  total: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ArticleListResponseData>,
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
  const orderBy = query.sort
    ? query.sort.map((s) => {
        const [key, order] = s.split(":");
        return { [key]: order };
      })
    : undefined;
  const [articles, total] = await prisma.$transaction([
    prisma.article.findMany({
      where,
      orderBy,
      take: query.per,
      skip,
    }),
    prisma.article.count({ where }),
  ]);
  res.status(200).json({ articles, total });
}

const MAX_PER = 100;

const parseQuery = (rawQuery: unknown) => {
  const defaultQuery = { page: 1, per: 10, keyword: undefined, sort: null };
  if (rawQuery == null || typeof rawQuery !== "object") return defaultQuery;

  const query = rawQuery as Record<string, unknown>;
  const page = parseNumber(query.page) ?? defaultQuery.page;
  const parsedPer = parseNumber(query.per);
  const per = parsedPer && parsedPer <= MAX_PER ? parsedPer : defaultQuery.per;
  const keyword = parseString(query.keyword);
  const sort = (parseString(query.sort)
    ?.split(",")
    .filter((s) => ARTICLE_LIST_SORTS.includes(s as any)) ?? null) as
    | (typeof ARTICLE_LIST_SORTS)[number][]
    | null;
  return { page, per, keyword, sort };
};
