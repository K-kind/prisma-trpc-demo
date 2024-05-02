import { Article } from "@/features/articles/models/article";

export const getArticleList = async () => {
  const res = await fetch("/api/articles");
  return (await res.json()) as { articles: Article[] };
};
