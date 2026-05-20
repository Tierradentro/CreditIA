import { z } from "zod";
import { createRouter, publicQuery } from "../middleware";
import OpenAI from "openai";

export const openaiRouter = createRouter({
  validateKey: publicQuery.query(() => {
    return { configured: false };
  }),

  chat: publicQuery
    .input(
      z.object({
        messages: z.array(
          z.object({
            role: z.enum(["user", "assistant", "system"]),
            content: z.string(),
          })
        ),
        systemPrompt: z.string(),
        model: z.string().default("gpt-4o-mini"),
        temperature: z.number().min(0).max(2).default(0.7),
        maxTokens: z.number().min(1).max(4096).default(1000),
        apiKey: z.string().min(1),
      })
    )
    .mutation(async ({ input }) => {
      if (!input.apiKey || !input.apiKey.startsWith("sk-")) {
        return {
          success: false,
          error: "API Key invalida. Debe comenzar con 'sk-'.",
          content: null,
          usage: null,
        };
      }

      try {
        const openai = new OpenAI({ apiKey: input.apiKey });

        const apiMessages: OpenAI.Chat.ChatCompletionMessageParam[] = [
          { role: "system", content: input.systemPrompt },
          ...input.messages.map((m) => ({
            role: m.role as "user" | "assistant" | "system",
            content: m.content,
          })),
        ];

        const completion = await openai.chat.completions.create({
          model: input.model,
          messages: apiMessages,
          temperature: input.temperature,
          max_tokens: input.maxTokens,
        });

        const content = completion.choices[0]?.message?.content || "";

        return {
          success: true,
          error: null,
          content,
          usage: completion.usage,
        };
      } catch (error: unknown) {
        const errMessage = error instanceof Error ? error.message : "Error desconocido";
        return {
          success: false,
          error: errMessage,
          content: null,
          usage: null,
        };
      }
    }),
});
