import { createRouter, publicQuery } from "./middleware";
import { openaiRouter } from "./routers/openai";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),

  openai: openaiRouter,
});

export type AppRouter = typeof appRouter;
