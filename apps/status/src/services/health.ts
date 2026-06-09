import type { ComponentStatus } from "./statuspage";

export async function checkService(url: string, serviceName: string): Promise<ComponentStatus> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    const response = await fetch(url, {
      signal: controller.signal,
      headers: { "User-Agent": "Waver-Status-Checker/1.0" },
    });

    clearTimeout(timeoutId);

    if (response.ok) return "operational";

    if (response.status >= 500) return "major_outage";

    return "partial_outage";
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error checking service [${serviceName}] at ${url}:`, error);

    return "major_outage";
  }
}
