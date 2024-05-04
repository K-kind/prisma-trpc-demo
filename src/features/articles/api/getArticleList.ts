import {
  ArticleListQuery,
  ArticleListResponseData,
} from "@/pages/api/articles";
import { getQueryString } from "@/utils/uri";

type Options = {
  query: ArticleListQuery;
};

export const getArticleList = async ({ query }: Options = { query: {} }) => {
  const res = await fetch(`/api/articles${getQueryString(query)}`);
  return (await res.json()) as ArticleListResponseData;
};
