import cron from "node-cron";
import { runHealthChecks } from "./tasks/health-check";

runHealthChecks();

console.log("Statuspage Health Checker Worker started. Cron scheduled to run every 5 minutes.");
cron.schedule("*/5 * * * *", () => {
  runHealthChecks();
});
