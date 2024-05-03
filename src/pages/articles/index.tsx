import { getArticleList } from "@/features/articles/api/getArticleList";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function ArticleIndex() {
  const query = useQuery({ queryKey: ["articles"], queryFn: getArticleList });
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">記事一覧</h1>
      {query.data && (
        <table className="border-collapse border border-slate-400 mt-4 w-full">
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
              <th className="border border-slate-300 dark:border-slate-600 font-semibold p-4"></th>
            </tr>
          </thead>
          <tbody>
            {query.data.articles.map((article) => (
              <tr key={article.id}>
                <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                  {article.id}
                </td>
                <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                  {article.title}
                </td>
                <td className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                  {article.content}
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

      <div className="mt-4">
        <Link href="/articles/new">
          <span className="text-blue-400">新規作成はこちら</span>
        </Link>
      </div>
    </div>
  );
}
