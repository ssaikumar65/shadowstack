import { NextResponse } from "next/server";
import { scanHeaders } from "@/lib/scrapers/headers";
import { scanNetwork } from "@/lib/scrapers/network";
import { redis } from "@/lib/redis";
import { Signal } from "@/lib/types";
import { scanHTML } from "@/lib/scrapers/html";

function isValidDomain(domain: string) {
  return /^[a-z0-9.-]+\.[a-z]{2,}$/i.test(domain);
}

function normalizeDomain(input: string) {
  return input
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .split("/")[0]
    .trim();
}

export async function POST(req: Request) {
  try {
    const { domain: rawDomain } = await req.json();

    const domain = normalizeDomain(rawDomain);

    if (!domain) {
      return NextResponse.json(
        { error: "Please enter a company domain." },
        { status: 400 },
      );
    }

    if (!isValidDomain(domain)) {
      return NextResponse.json(
        { error: "That doesn’t look like a real domain." },
        { status: 400 },
      );
    }

    try {
      const res = await fetch(`https://${domain}`, { method: "HEAD" });
      if (!res.ok) {
        return NextResponse.json(
          { error: "Company website not reachable." },
          { status: 404 },
        );
      }
    } catch {
      return NextResponse.json(
        { error: "Company website not reachable." },
        { status: 404 },
      );
    }

    const cacheKey = `scan:${domain}`;
    const cached = await redis.get(cacheKey);
    if (cached) return NextResponse.json(cached);

    // Verify site exists
    const head = await fetch(`https://${domain}`, { method: "HEAD" });
    if (!head.ok) {
      return NextResponse.json(
        { error: "Company website not reachable" },
        { status: 404 },
      );
    }

    // Run architecture detectors
    const [html, headers, network] = await Promise.all([
      scanHTML(domain),
      scanHeaders(domain),
      scanNetwork(domain),
    ]);

    const all: Signal[] = [...html, ...headers, ...network];

    if (all.length === 0) {
      return NextResponse.json(
        { error: "No architecture signals detected" },
        { status: 404 },
      );
    }

    // Merge by key
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

    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
