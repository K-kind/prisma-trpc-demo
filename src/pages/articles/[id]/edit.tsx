import { getArticle } from "@/features/articles/api/getArticle";
import { updateArticle } from "@/features/articles/api/updateArticle";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useMemo, useState } from "react";

export default function ArticleEdit() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();
  const id = useMemo(() => Number(router.query.id), [router.query]);

  const query = useQuery({
    queryKey: ["articles", id],
    queryFn: () => getArticle({ id }),
  });
  const article = useMemo(() => query.data?.article, [query.data]);

  useEffect(() => {
    if (article == null) return;

    setTitle(article.title);
    setContent(article.content);
  }, [article]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateArticle({ id, params: { title, content } });
    await router.push(`/articles/${id}`);
  };

  return (
    <div className="p-6 max-w-screen-sm mx-auto">
      <h1 className="text-xl font-bold">記事編集</h1>

      <form className="mt-4 max-w-96" onSubmit={onSubmit}>
        <div>
          <label className="block" htmlFor="title">
            タイトル
          </label>
          <input
            value={title}
            className="border mt-1 w-full"
            type="text"
            id="title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mt-2">
          <label className="block" htmlFor="content">
            コンテンツ
          </label>
          <textarea
            value={content}
            className="border mt-1 w-full"
            id="content"
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div>
          <button
            className="border py-1 px-4 bg-blue-600 text-white"
            type="submit"
          >
            保存
          </button>
        </div>
      </form>

      <div className="mt-4">
        <Link href={`/articles/${id}`}>
          <span className="text-blue-400">詳細に戻る</span>
        </Link>
      </div>
    </div>
  );
}
