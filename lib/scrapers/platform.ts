export async function scanPlatform(domain: string) {
  const h = (await fetch(`https://${domain}`, { method: "HEAD" })).headers;
  const s = [];

  if (h.get("x-vercel-id")) s.push({ key: "platform", value: "Vercel", confidence: 0.9 });
  if (h.get("cf-ray")) s.push({ key: "platform", value: "Cloudflare", confidence: 0.9 });
  if (h.get("x-netlify")) s.push({ key: "platform", value: "Netlify", confidence: 0.9 });

  return s;
}
