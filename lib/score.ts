export function computeModernity(signals: any[]) {
  let score = 0;

  if (signals.find(s => s.key === "runtime" && s.value === "Edge")) score += 20;
  if (signals.find(s => s.key === "rsc")) score += 20;
  if (signals.find(s => s.key === "compression" && s.value === "Brotli")) score += 10;
  if (signals.find(s => s.key === "security")) score += 10;
  if (signals.find(s => s.key === "delivery")) score += 10;
  if (signals.find(s => s.key === "frontendWeight" && s.value === "Light")) score += 10;

  return Math.min(score, 100);
}
