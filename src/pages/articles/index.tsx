import { getArticleList } from "@/features/articles/api/getArticleList";
import { useQuery } from "@tanstack/react-query";

export default function ArticleIndex() {
  const query = useQuery({ queryKey: ["articles"], queryFn: getArticleList });
  return (
    <div className="p-6">
      <h1 className="text-xl">記事一覧</h1>
      {query.data && (
        <table className="border-collapse border border-slate-400 mt-4 w-full">
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
          </tr>
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
            </tr>
          ))}
        </table>
      )}
    </div>
  );
}
