import type { Article } from "@prisma/client";

import { type RouterInput } from "@/lib/trpc";

export { Article };

export const ARTICLE_LIST_SORTS = ["createdAt:asc", "createdAt:desc"] as const;

export const MIN_TITLE_LENGTH = 1;
export const MAX_TITLE_LENGTH = 255;
export const MIN_CONTENT_LENGTH = 1;
export const MAX_CONTENT_LENGTH = 10000;

export type ArticleCreateInput = RouterInput["article"]["create"];
export type ArticleUpdateParams = RouterInput["article"]["update"];
