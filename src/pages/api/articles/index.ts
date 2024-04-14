import type { NextApiRequest, NextApiResponse } from "next";

type Article = {
  id: number;
  title: string;
  body: string;
};

type Data = {
  articles: Article[];
};

const mockArticles = [
  {
    id: 1,
    title: "サンプル1",
    body: "これはサンプル1です。\nこれはサンプル1です。",
  },
  {
    id: 2,
    title: "サンプル2",
    body: "これはサンプル2です。\nこれはサンプル2です。",
  },
  {
    id: 3,
    title: "サンプル3",
    body: "これはサンプル3です。\nこれはサンプル3です。",
  },
] satisfies Article[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ articles: mockArticles });
}
