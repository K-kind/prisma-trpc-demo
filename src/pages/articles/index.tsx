import { Pagination } from "@/components/Pagination";
import { getArticleList } from "@/features/articles/api/getArticleList";
import { ARTICLE_LIST_SORTS } from "@/pages/api/articles";
import { truncateString } from "@/utils/format";
import { parseString } from "@/utils/parseTypes";
import { getQueryString } from "@/utils/uri";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useMemo, useState } from "react";

export default function ArticleIndex() {
  const router = useRouter();
  const page = useMemo(
    () => parseString(router.query.page) ?? "1",
    [router.query]
  );
  const per = useMemo(
    () => parseString(router.query.per) ?? "10",
    [router.query]
  );
  const keyword = useMemo(
    () => parseString(router.query.keyword) ?? undefined,
    [router.query]
  );
  const sort = useMemo(
    () => parseString(router.query.sort) ?? undefined,
    [router.query]
  );

  const query = useQuery({
    queryKey: ["articles", { page, per, keyword, sort }],
    queryFn: () => getArticleList({ query: { page, per, keyword, sort } }),
  });

  const articles = useMemo(() => query.data?.articles, [query.data]);
  const total = useMemo(() => query.data?.total, [query.data]);
  const totalPages = useMemo(() => {
    if (total == null) return undefined;

    return Math.ceil(total / Number(per));
  }, [per, total]);

  const [keywordState, setKeywordState] = useState("");

  const onSubmitSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await router.push(
      `/articles${getQueryString({
        ...router.query,
        page: "1",
        keyword: keywordState || undefined,
      })}`
    );
    setKeywordState("");
  };

  const onPaginate = (nextPage: number) => {
    return router.push(
      `/articles${getQueryString({
        ...router.query,
        page: String(nextPage),
      })}`
    );
  };

  const onChangeSort = (value: (typeof ARTICLE_LIST_SORTS)[number]) => {
    return router.push(
      `/articles${getQueryString({
        ...router.query,
        sort: value,
      })}`
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">記事一覧</h1>
      <form
        className="border border-slate-400 rounded mt-4 p-4"
        onSubmit={onSubmitSearch}
      >
        <label>
          <span className="mr-4">キーワード</span>
          <input
            value={keywordState}
            type="text"
            className="border w-96"
            onChange={(e) => setKeywordState(e.target.value)}
          />
        </label>

        <div className="flex justify-center mt-4">
          <button
            className="border py-1 px-4 bg-blue-600 text-white"
            type="submit"
          >
            検索
          </button>
        </div>
      </form>

      {articles && (
        <table className="border-collapse border border-slate-400 mt-6 w-full">
          <thead>
            <tr>
              <th className="border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">
                ID
              </th>
              <th className="border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">
                タイトル
              </th>
              <th className="border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">
                コンテンツ
              </th>
              <th className="border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">
                <div className="flex">
                  <span>作成日</span>
                  <span className="ml-2 flex gap-1">
                    <button
                      className={
                        sort?.includes("createdAt:asc") ? "" : "text-blue-600"
                      }
                      disabled={sort?.includes("createdAt:asc")}
                      onClick={() => onChangeSort("createdAt:asc")}
                    >
                      ↑
                    </button>
                    <button
                      className={
                        sort?.includes("createdAt:desc") ? "" : "text-blue-600"
                      }
                      disabled={sort?.includes("createdAt:desc")}
                      onClick={() => onChangeSort("createdAt:desc")}
                    >
                      ↓
                    </button>
                  </span>
                </div>
              </th>
              <th className="border border-slate-300 dark:border-slate-600 font-semibold p-4"></th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article.id}>
                <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                  {article.id}
                </td>
                <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                  {article.title}
                </td>
                <td
                  className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400"
                  style={{ width: "45%" }}
                >
                  {truncateString(article.content)}
                </td>
                <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                  {article.createdAt.toLocaleString()}
                </td>
                <td className="border border-slate-300 dark:border-slate-700 p-4">
                  <Link href={`/articles/${article.id}`}>
                    <span className="text-blue-400">詳細</span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {totalPages && (
        <div className="mt-4">
          <Pagination
            page={Number(page)}
            totalPages={totalPages}
            goTo={onPaginate}
          />
        </div>
      )}

      <div className="mt-4">
        <Link href="/articles/new">
          <span className="text-blue-400">新規作成はこちら</span>
        </Link>
      </div>
    </div>
  );
}
