export async function scanNetwork(domain: string) {
  const res = await fetch(`https://${domain}`);
  const html = await res.text();

  const signals = [];

  if (html.includes("api.")) {
    signals.push({
      key: "architecture",
      value: "API Gateway",
      confidence: 0.7,
    });
  }
  if (html.includes("/api/")) {
    signals.push({ key: "architecture", value: "Monolith", confidence: 0.7 });
  }

  return signals;
}
