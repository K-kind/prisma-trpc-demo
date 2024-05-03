export type { Article } from "@prisma/client";

export type ArticleCreateParams = {
  title: string;
  content: string;
};

export type ArticleUpdateParams = ArticleCreateParams;
