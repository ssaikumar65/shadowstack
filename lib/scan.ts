import { redis } from "@/lib/redis";
import { parseDomain } from "@/lib/domain";
import { scanHTML } from "@/lib/scrapers/html";
import { scanHeaders } from "@/lib/scrapers/headers";
import { scanNetwork } from "@/lib/scrapers/network";

export async function scan(rawInput: string) {
  const parsed = parseDomain(rawInput);

  if (!parsed) {
    throw new Error("Invalid domain");
  }

  const domain = parsed;

  const cacheKey = `scan:${domain}`;
  const cached = await redis.get(cacheKey);
  if (cached) return cached;

  let head;
  try {
    head = await fetch(`https://${domain}`, { method: "HEAD" });
  } catch {
    throw new Error("Website not reachable");
  }

  if (!head.ok) {
    throw new Error("Website not reachable");
  }

  const [html, headers, network] = await Promise.all([
    scanHTML(domain),
    scanHeaders(domain),
    scanNetwork(domain),
  ]);

  const all = [...html, ...headers, ...network];

  if (all.length === 0) {
    throw new Error("No architecture signals found");
  }
  const grouped: Record<string, { value: string; confidence: number }[]> = {};

  for (const s of all) {
    if (!grouped[s.key]) grouped[s.key] = [];
    grouped[s.key].push({ value: s.value, confidence: s.confidence });
  }

  const architecture = Object.entries(grouped).map(([key, values]) => {
    const best = values.sort((a, b) => b.confidence - a.confidence)[0];
    return {
      key,
      value: best.value,
      confidence: best.confidence,
    };
  });
  const result = {
    domain,
    scannedAt: new Date().toISOString(),
    architecture,
  };

  await redis.set(cacheKey, result, { ex: 60 * 60 * 24 });

  return result;
}
