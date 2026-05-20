import type { Hono } from "hono";
import type { HttpBindings } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import fs from "fs";
import path from "path";

type App = Hono<{ Bindings: HttpBindings }>;

export function serveStaticFiles(app: App) {
  const distPath = path.resolve(import.meta.dirname, "../dist/public");

  // Serve static files (CSS, JS, images, etc.)
  app.use("/assets/*", serveStatic({ root: "./dist/public" }));
  app.use("/logoBG.png", serveStatic({ root: "./dist/public" }));
  app.use("/*.jpg", serveStatic({ root: "./dist/public" }));
  app.use("/*.png", serveStatic({ root: "./dist/public" }));
  app.use("/*.svg", serveStatic({ root: "./dist/public" }));

  // Catch-all: serve index.html for any non-API route (SPA fallback)
  app.use("*", (c) => {
    const accept = c.req.header("accept") ?? "";
    // If it's not a browser request, return 404
    if (!accept.includes("text/html")) {
      return c.json({ error: "Not Found" }, 404);
    }
    // Serve index.html for all client-side routes
    const indexPath = path.resolve(distPath, "index.html");
    const content = fs.readFileSync(indexPath, "utf-8");
    return c.html(content);
  });
}
