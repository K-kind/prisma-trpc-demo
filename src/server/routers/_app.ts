import { articleRouter } from "@/server/routers/article";

import { router } from "../trpc";

export const appRouter = router({
  article: articleRouter,
});

export type AppRouter = typeof appRouter;
