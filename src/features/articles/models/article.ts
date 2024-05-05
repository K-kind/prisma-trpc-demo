import type { Article } from "@prisma/client";

export { Article };

/** APIを通すとDateでなくなるので、Dateに戻す */
export const convertToArticle = (
  article: Omit<Article, "createdAt" | "updatedAt"> & {
    createdAt: string;
    updatedAt: string;
  },
) => {
  return {
    ...article,
    createdAt: new Date(article.createdAt),
    updatedAt: new Date(article.updatedAt),
  };
};

export type ArticleCreateParams = {
  title: string;
  content: string;
};

export type ArticleUpdateParams = ArticleCreateParams;
