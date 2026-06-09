import { env } from "../config/env";
import { checkService } from "../services/health";
import { updateComponentStatus } from "../services/statuspage";

export async function runHealthChecks() {
  console.log(`[${new Date().toISOString()}] Running health checks...`);
  const checks: Promise<void>[] = [];

  if (env.COMPONENT_WEB_ID && env.URL_CHECK_WEB) {
    checks.push(
      checkService(env.URL_CHECK_WEB, "Web").then((status) => updateComponentStatus(env.COMPONENT_WEB_ID!, status)),
    );
  }

  if (env.COMPONENT_DOCS_ID && env.URL_CHECK_DOCS) {
    checks.push(
      checkService(env.URL_CHECK_DOCS, "Docs").then((status) => updateComponentStatus(env.COMPONENT_DOCS_ID!, status)),
    );
  }

  if (env.COMPONENT_BOT_ID && env.URL_CHECK_BOT) {
    checks.push(
      checkService(env.URL_CHECK_BOT, "Bot").then((status) => updateComponentStatus(env.COMPONENT_BOT_ID!, status)),
    );
  }

  await Promise.allSettled(checks);
  console.log(`[${new Date().toISOString()}] Health checks completed.`);
}
