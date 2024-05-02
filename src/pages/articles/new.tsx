import { createArticle } from "@/features/articles/api/createArticle";
import { useQuery } from "@tanstack/react-query";
import { FormEvent, useState } from "react";

export default function ArticleNew() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(title, content);
    const data = await createArticle({ params: { title, content } });
    console.log(data);
    setTitle("");
    setContent("");
  };

  return (
    <div className="p-6">
      <h1 className="text-xl">記事作成</h1>

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
    </div>
  );
}
