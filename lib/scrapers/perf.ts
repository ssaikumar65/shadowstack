export async function scanPerf(domain: string) {
  const res = await fetch(`https://${domain}`, { cache: "no-store" });

  const h = res.headers;
  const html = await res.text();

  const signals = [];

  if (h.get("content-encoding")?.includes("br"))
    signals.push({ key: "compression", value: "Brotli", confidence: 0.9 });

  if (h.get("server-timing"))
    signals.push({ key: "delivery", value: "Edge Cached", confidence: 0.8 });

  if (html.length < 20000)
    signals.push({ key: "frontendWeight", value: "Light", confidence: 0.7 });
  else signals.push({ key: "frontendWeight", value: "Heavy", confidence: 0.7 });

  return signals;
}
