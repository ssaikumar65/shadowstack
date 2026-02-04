export async function scanSecurity(domain: string) {
  const res = await fetch(`https://${domain}`, { method: "HEAD" });
  const h = res.headers;

  const signals = [];

  if (h.get("strict-transport-security"))
    signals.push({ key: "security", value: "Hardened", confidence: 0.9 });

  if (!h.get("x-powered-by"))
    signals.push({ key: "leaks", value: "None", confidence: 0.8 });

  return signals;
}
