import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArticleCreateInput } from "@/features/articles/models/article";
import { articleSchema } from "@/features/articles/models/articleSchemas";
import { trpc } from "@/lib/trpc";

type FormValues = ArticleCreateInput;

export default function ArticleNew() {
  const router = useRouter();

  const mutation = trpc.article.create.useMutation();

  const schema = useMemo(
    () =>
      articleSchema().pick({
        title: true,
        content: true,
      }),
    [],
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const submit = async (values: FormValues) => {
    if (mutation.isPending) return;

    try {
      const article = await mutation.mutateAsync(values);
      router.push(`/articles/${article.id}`);
    } catch (e) {
      alert("エラーが発生しました。");
      console.error(e);
    }
  };

  return (
    <div className="p-6 max-w-screen-sm mx-auto">
      <h1 className="text-xl font-bold">記事作成</h1>

      <Form {...form}>
        <form className="mt-4 max-w-96" onSubmit={form.handleSubmit(submit)}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>タイトル</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel>コンテンツ</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mt-4">
            <Button type="submit" loading={mutation.isPending}>
              保存
            </Button>
          </div>
        </form>
      </Form>

      <div className="mt-4">
        <Link href="/articles">
          <span className="text-blue-400">一覧に戻る</span>
        </Link>
      </div>
    </div>
  );
}
