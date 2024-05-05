import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";

import { destroyArticle } from "@/features/articles/api/destroyArticle";
import { getArticle } from "@/features/articles/api/getArticle";

export default function ArticleShow() {
  const router = useRouter();
  const id = useMemo(() => Number(router.query.id), [router.query]);
  const query = useQuery({
    queryKey: ["articles", id],
    queryFn: () => getArticle({ id }),
  });
  const article = useMemo(() => query.data?.article, [query.data]);

  const onClickDestroy = async () => {
    await destroyArticle({ id });
    await router.push("/articles");
  };

  return (
    <div className="p-6 max-w-screen-sm mx-auto">
      <h1 className="text-xl font-bold">記事詳細</h1>
      {article && (
        <>
          <div className="mt-4">
            <div className="font-bold">ID</div>
            <div className="mt-2">{article.id}</div>
          </div>
          <div className="mt-4">
            <div className="font-bold">タイトル</div>
            <div className="mt-2">{article.title}</div>
          </div>
          <div className="mt-4">
            <div className="font-bold">コンテンツ</div>
            <div className="mt-2 whitespace-pre-line">{article.content}</div>
          </div>
          <div className="mt-4">
            <div className="font-bold">作成日</div>
            <div className="mt-2">{article.createdAt.toLocaleString()}</div>
          </div>
          <div className="mt-4">
            <div className="font-bold">更新日</div>
            <div className="mt-2">{article.updatedAt.toLocaleString()}</div>
          </div>
        </>
      )}

      <div className="mt-4 flex justify-between items-center">
        <Link href="/articles">
          <span className="text-blue-400">一覧に戻る</span>
        </Link>

        {article && (
          <div className="flex gap-4">
            <Link href={`/articles/${article.id}/edit`}>
              <span className="text-green-400">編集</span>
            </Link>
            <button className="text-red-400" onClick={onClickDestroy}>
              削除
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
