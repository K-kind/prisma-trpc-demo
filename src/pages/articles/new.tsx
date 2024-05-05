import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import { createArticle } from "@/features/articles/api/createArticle";

export default function ArticleNew() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { article } = await createArticle({ params: { title, content } });
    router.push(`/articles/${article.id}`);
  };

  return (
    <div className="p-6 max-w-screen-sm mx-auto">
      <h1 className="text-xl font-bold">記事作成</h1>

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
        <Link href="/articles">
          <span className="text-blue-400">一覧に戻る</span>
        </Link>
      </div>
    </div>
  );
}
