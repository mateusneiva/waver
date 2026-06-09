import { env } from "../config/env";

export type ComponentStatus =
  | "operational"
  | "under_maintenance"
  | "degraded_performance"
  | "partial_outage"
  | "major_outage";

export async function updateComponentStatus(componentId: string, status: ComponentStatus) {
  if (!env.STATUSPAGE_PAGE_ID || !env.STATUSPAGE_API_KEY) {
    console.error("Missing Statuspage credentials in environment variables.");
    return;
  }

  const url = `https://api.statuspage.io/v1/pages/${env.STATUSPAGE_PAGE_ID}/components/${componentId}`;

  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        Authorization: `OAuth ${env.STATUSPAGE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        component: {
          status: status,
        },
      }),
    });

    if (!response.ok) {
      console.error(
        `[${new Date().toISOString()}] Failed to update component ${componentId} to ${status}:`,
        await response.text(),
      );

      return;
    }

    console.log(`[${new Date().toISOString()}] Successfully updated component ${componentId} to ${status}`);
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error updating component ${componentId}:`, error);
  }
}
