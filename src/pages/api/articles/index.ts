import { Article } from "@/features/articles/models/article";
import { returnJsonError } from "@/lib/apiUtils";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  articles: Article[];
};

const mockArticles = [
  {
    id: 1,
    title: "サンプル1",
    content: "これはサンプル1です。\nこれはサンプル1です。",
  },
  {
    id: 2,
    title: "サンプル2",
    content: "これはサンプル2です。\nこれはサンプル2です。",
  },
  {
    id: 3,
    title: "サンプル3",
    content: "これはサンプル3です。\nこれはサンプル3です。",
  },
] satisfies Article[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "GET") returnJsonError(res, "Invalid request", 422);

  res.status(200).json({ articles: mockArticles });
}
