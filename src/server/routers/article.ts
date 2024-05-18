import type { Prisma } from "@prisma/client";
import { z } from "zod";

import { ARTICLE_LIST_SORTS } from "@/features/articles/models/article";
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
  // byId: procedure
  //   .input(
  //     z.object({
  //       id: z.string(),
  //     }),
  //   )
  //   .query(async ({ input }) => {
  //     const { id } = input;
  //     const post = await prisma.post.findUnique({
  //       where: { id },
  //       select: defaultPostSelect,
  //     });
  //     if (!post) {
  //       throw new TRPCError({
  //         code: 'NOT_FOUND',
  //         message: `No post with id '${id}'`,
  //       });
  //     }
  //     return post;
  //   }),
  // add: procedure
  //   .input(
  //     z.object({
  //       id: z.string().uuid().optional(),
  //       title: z.string().min(1).max(32),
  //       text: z.string().min(1),
  //     }),
  //   )
  //   .mutation(async ({ input }) => {
  //     const post = await prisma.post.create({
  //       data: input,
  //       select: defaultPostSelect,
  //     });
  //     return post;
  //   }),
});
