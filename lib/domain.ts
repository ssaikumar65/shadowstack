export function parseDomain(input: string) {
  if (!input) return null;

  const clean = input
    .toLowerCase()
    .trim()
    .replace(/^https?:\/\//, "")
    .replace(/\/.*$/, "");

  if (!clean.includes(".")) return null;

  if (!/^[a-z0-9.-]+$/.test(clean)) return null;

  if (clean.split(".").some((p) => p.length === 0)) return null;

  return clean;
}
