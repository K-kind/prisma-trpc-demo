import type { Article } from "@prisma/client";

export { Article };

export const ARTICLE_LIST_SORTS = ["createdAt:asc", "createdAt:desc"] as const;

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

export const MIN_TITLE_LENGTH = 1;
export const MAX_TITLE_LENGTH = 255;
export const MIN_CONTENT_LENGTH = 1;
export const MAX_CONTENT_LENGTH = 10000;

export type ArticleUpdateParams = ArticleCreateParams;
