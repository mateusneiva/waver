import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  STATUSPAGE_PAGE_ID: z.string().min(1, "STATUSPAGE_PAGE_ID is required"),
  STATUSPAGE_API_KEY: z.string().min(1, "STATUSPAGE_API_KEY is required"),

  COMPONENT_WEB_ID: z.string().optional(),
  COMPONENT_DOCS_ID: z.string().optional(),
  COMPONENT_BOT_ID: z.string().optional(),

  URL_CHECK_WEB: z.url().optional(),
  URL_CHECK_DOCS: z.url().optional(),
  URL_CHECK_BOT: z.url().optional(),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("❌ Invalid environment variables:", _env.error.format());
  process.exit(1);
}

export const env = _env.data;

