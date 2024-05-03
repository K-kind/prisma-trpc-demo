import { Article } from "@/features/articles/models/article";

type Options = {
  id: number;
};

export const getArticle = async ({ id }: Options) => {
  const res = await fetch(`/api/articles/${id}`);
  return (await res.json()) as { article: Article };
};
