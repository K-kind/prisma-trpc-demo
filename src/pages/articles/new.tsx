import Link from "next/link";
import { useRouter } from "next/navigation";

import { ArticleForm } from "@/features/articles/components/ArticleForm";
import { ArticleCreateInput } from "@/features/articles/models/article";
import { trpc } from "@/lib/trpc";

export default function ArticleNew() {
  const router = useRouter();

  const mutation = trpc.article.create.useMutation();

  const onSubmit = async (input: ArticleCreateInput) => {
    if (mutation.isPending) return;

    try {
      const article = await mutation.mutateAsync(input);
      router.push(`/articles/${article.id}`);
    } catch (e) {
      alert("エラーが発生しました。");
      console.error(e);
    }
  };

  return (
    <div className="p-6 max-w-screen-sm mx-auto">
      <h1 className="text-xl font-bold">記事作成</h1>

      <ArticleForm
        type="create"
        isLoading={mutation.isPending}
        onSubmit={onSubmit}
      />

      <div className="mt-4">
        <Link href="/articles">
          <span className="text-blue-400">一覧に戻る</span>
        </Link>
      </div>
    </div>
  );
}
