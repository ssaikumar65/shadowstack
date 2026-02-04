export async function scanAPI(domain: string) {
  const html = await (await fetch(`https://${domain}`)).text();
  const s = [];

  if (html.includes("/graphql")) s.push({ key: "api", value: "GraphQL", confidence: 0.8 });
  if (html.includes("/api/")) s.push({ key: "api", value: "REST", confidence: 0.6 });

  return s;
}
