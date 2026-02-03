export async function scanHTML(domain: string) {
  const res = await fetch(`https://${domain}`);
  const html = await res.text();

  const signals = [];

  if (html.includes("__NEXT_DATA__")) {
    signals.push({ key: "framework", value: "Next.js", confidence: 0.9 });
  }
  if (html.includes("_nuxt")) {
    signals.push({ key: "framework", value: "Nuxt", confidence: 0.9 });
  }
  if (html.includes("ng-version")) {
    signals.push({ key: "framework", value: "Angular", confidence: 0.9 });
  }
  if (html.includes("data-reactroot") || html.includes("react")) {
    signals.push({ key: "framework", value: "React", confidence: 0.6 });
  }
  if (html.includes("vue")) {
    signals.push({ key: "framework", value: "Vue", confidence: 0.6 });
  }

  const hasContent =
    html.replace(/<script[\s\S]*?<\/script>/g, "").length > 5000;
  if (hasContent) {
    signals.push({ key: "rendering", value: "SSR", confidence: 0.7 });
  } else {
    signals.push({ key: "rendering", value: "SPA", confidence: 0.7 });
  }

  if (html.includes("react-server-dom-webpack")) {
    signals.push({ key: "rsc", value: "Enabled", confidence: 0.9 });
  }

  return signals;
}
