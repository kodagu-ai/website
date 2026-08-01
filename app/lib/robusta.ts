// Shared London Robusta futures fetch (Investing.com via Firecrawl).
// Used by the live /api/coffee/robusta route and the daily price cron.

export type RobustaQuote = {
  price: number;
  prevClose: number;
  changePct: number;
  currency: string;
  contract: string | null;
};

export async function fetchRobusta(apiKey: string): Promise<RobustaQuote | null> {
  try {
    const res = await fetch("https://api.firecrawl.dev/v1/scrape", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        url: "https://www.investing.com/commodities/london-coffee",
        formats: ["json"],
        maxAge: 1_800_000,
        jsonOptions: {
          prompt: "Extract the London Robusta Coffee futures quote.",
          schema: {
            type: "object",
            properties: {
              price: { type: "number" },
              previousClose: { type: "number" },
              currency: { type: "string" },
              contractMonth: { type: "string" },
            },
            required: ["price", "previousClose"],
          },
        },
      }),
    });
    if (!res.ok) {
      console.error("Firecrawl robusta failed:", res.status);
      return null;
    }
    const j = (await res.json())?.data?.json;
    const price = Number(j?.price);
    const prev = Number(j?.previousClose);
    if (!price || !prev) return null;
    // Compute the change ourselves — LLM percent fields are unreliable.
    return {
      price,
      prevClose: prev,
      changePct: +(((price - prev) / prev) * 100).toFixed(2),
      currency: j.currency || "USD",
      contract: j.contractMonth || null,
    };
  } catch (err) {
    console.error("fetchRobusta error:", err);
    return null;
  }
}
