import type { Prisma } from "@prisma/client";
import { z } from "zod";

import {
  ARTICLE_LIST_SORTS,
  MAX_CONTENT_LENGTH,
  MAX_TITLE_LENGTH,
  MIN_CONTENT_LENGTH,
  MIN_TITLE_LENGTH,
} from "@/features/articles/models/article";
import { prisma } from "@/lib/prisma";
import { calcOffset } from "@/utils/pagination";

import { procedure, router } from "../trpc";

const articleListSelect = {
  id: true,
  title: true,
  content: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.ArticleSelect;

const articleDetailSelect = articleListSelect satisfies Prisma.ArticleSelect;

const ARTICLE_LIST_DEFAULT_PER = 10;
const ARTICLE_LIST_MAX_PER = 100;

export const articleRouter = router({
  list: procedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        per: z
          .number()
          .min(1)
          .max(ARTICLE_LIST_MAX_PER)
          .default(ARTICLE_LIST_DEFAULT_PER),
        keyword: z.string().optional(),
        sort: z.array(z.enum(ARTICLE_LIST_SORTS)).optional(),
      }),
    )
    .query(async ({ input }) => {
      const skip = calcOffset({ page: input.page, per: input.per });
      const keyword = input.keyword;
      const where = keyword
        ? {
            OR: [
              { title: { contains: keyword } },
              { content: { contains: keyword } },
            ],
          }
        : undefined;
      const orderBy = input.sort
        ? input.sort.map((s) => {
            const [key, order] = s.split(":");
            return { [key]: order };
          })
        : undefined;
      const [articles, total] = await prisma.$transaction([
        prisma.article.findMany({
          select: articleListSelect,
          where,
          orderBy,
          take: input.per,
          skip,
        }),
        prisma.article.count({ where }),
      ]);

      return {
        articles,
        total,
      };
    }),
  byId: procedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const article = await prisma.article.findFirst({
        where: { id: input.id },
        select: articleDetailSelect,
      });
      return article;
    }),
  create: procedure
    .input(
      z.object({
        title: z.string().min(MIN_TITLE_LENGTH).max(MAX_TITLE_LENGTH),
        content: z.string().min(MIN_CONTENT_LENGTH).max(MAX_CONTENT_LENGTH),
      }),
    )
    .mutation(async ({ input }) => {
      const article = await prisma.article.create({ data: input });
      return article;
    }),
  update: procedure
    .input(
      z.object({
        id: z.number(),
        title: z.string().min(MIN_TITLE_LENGTH).max(MAX_TITLE_LENGTH),
        content: z.string().min(MIN_CONTENT_LENGTH).max(MAX_CONTENT_LENGTH),
      }),
    )
    .mutation(async ({ input }) => {
      const article = await prisma.article.update({
        where: { id: input.id },
        data: input,
      });
      return article;
    }),
  destroy: procedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ input }) => {
      await prisma.article.delete({
        where: { id: input.id },
      });
    }),
});
