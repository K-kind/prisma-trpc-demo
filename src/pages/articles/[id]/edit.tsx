import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useMemo, useState } from "react";

import { trpc } from "@/lib/trpc";

export default function ArticleEdit() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();
  const id = useMemo(() => Number(router.query.id), [router.query]);

  const query = trpc.article.byId.useQuery({ id }, { enabled: router.isReady });
  const article = useMemo(() => query.data ?? null, [query.data]);

  useEffect(() => {
    if (article == null) return;

    setTitle(article.title);
    setContent(article.content);
  }, [article]);

  const mutation = trpc.article.update.useMutation();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (mutation.isPending) return;

    try {
      await mutation.mutateAsync({ id, title, content });
      await router.push(`/articles/${id}`);
    } catch (e) {
      alert("エラーが発生しました。");
      console.error(e);
    }
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
            disabled={mutation.isPending}
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
