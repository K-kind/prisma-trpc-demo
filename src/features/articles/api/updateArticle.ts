import {
  Article,
  ArticleUpdateParams,
} from "@/features/articles/models/article";

type Options = {
  id: number;
  params: ArticleUpdateParams;
};

export const updateArticle = async ({ id, params }: Options) => {
  const res = await fetch(`/api/articles/${id}/update`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
  return (await res.json()) as { article: Article };
};
