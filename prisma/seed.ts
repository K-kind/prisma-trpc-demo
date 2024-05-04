import { ArticleCreateParams } from "@/features/articles/models/article";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createArticles = async () => {
  const lastArticle = await prisma.article.findFirst({
    orderBy: [{ id: "desc" }],
  });
  const nextArticleSeq = lastArticle ? lastArticle.id + 1 : 1;
  const articleData: ArticleCreateParams[] = [...Array(50)].map((_, index) => ({
    title: `テスト記事${index + nextArticleSeq}`,
    content: `これは${
      index + nextArticleSeq
    }個目の記事で、内容は適当です。\n市川市に新しい公園がオープンしました。この公園は、自然との調和を重視したデザインで、市民の憩いの場として期待されています。公園内には、子供たちが遊べるプレイグラウンド、ジョギングコース、そして静かな池があります。市長はオープニングセレモニーで、「この公園が市民の皆様にとって、日々のストレスを解消し、家族や友人との素敵な時間を過ごす場所になることを願っています」と述べました。\n公園は毎日開放され、特別なイベントも定期的に開催される予定です。`,
  }));
  const articles = articleData.map((data) => prisma.article.create({ data }));
  return await prisma.$transaction(articles);
};

const main = async () => {
  console.log(`Start seeding ...`);

  await createArticles();

  console.log(`Seeding finished.`);
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
