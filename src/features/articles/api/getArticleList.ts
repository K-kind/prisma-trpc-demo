import { convertToArticle } from "@/features/articles/models/article";
import {
  ArticleListQuery,
  ArticleListResponseData,
} from "@/pages/api/articles";
import { getQueryString } from "@/utils/uri";

type Options = {
  query: ArticleListQuery;
};

export const getArticleList = async (
  { query }: Options = { query: {} },
): Promise<ArticleListResponseData> => {
  const res = await fetch(`/api/articles${getQueryString(query)}`);
  const data = await res.json();
  return { articles: data.articles.map(convertToArticle), total: data.total };
};
