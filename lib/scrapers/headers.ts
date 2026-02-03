export async function scanHeaders(domain: string) {
  const res = await fetch(`https://${domain}`, { method: "HEAD" });
  const h = res.headers;

  const signals = [];

  const server = h.get("server") || "";
  const powered = h.get("x-powered-by") || "";

  if (powered.includes("Next")) {
    signals.push({ key: "framework", value: "Next.js", confidence: 0.8 });
  }

  if (h.get("x-vercel-edge")) {
    signals.push({ key: "runtime", value: "Edge", confidence: 0.9 });
  } else if (server.toLowerCase().includes("vercel")) {
    signals.push({ key: "runtime", value: "Node", confidence: 0.7 });
  }

  if (server.includes("cloudflare")) {
    signals.push({
      key: "runtime",
      value: "Cloudflare Workers",
      confidence: 0.8,
    });
  }

  return signals;
}
