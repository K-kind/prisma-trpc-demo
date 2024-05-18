import type { Article } from "@prisma/client";

import { type RouterInput } from "@/lib/trpc";

export { Article };

export const ARTICLE_LIST_SORTS = ["createdAt:asc", "createdAt:desc"] as const;

export type ArticleCreateInput = RouterInput["article"]["create"];
export type ArticleUpdateInput = RouterInput["article"]["update"];
