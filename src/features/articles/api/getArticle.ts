import { convertToArticle } from "@/features/articles/models/article";
import { ArticleResponseData } from "@/pages/api/articles/[id]";

type Options = {
  id: number;
};

export const getArticle = async ({
  id,
}: Options): Promise<ArticleResponseData> => {
  const res = await fetch(`/api/articles/${id}`);
  const data = await res.json();
  return { article: convertToArticle(data.article) };
};
