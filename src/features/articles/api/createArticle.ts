import {
  Article,
  ArticleCreateParams,
} from "@/features/articles/models/article";

type Options = {
  params: ArticleCreateParams;
};

export const createArticle = async ({ params }: Options) => {
  const res = await fetch("/api/articles/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
  return (await res.json()) as { article: Article };
};
