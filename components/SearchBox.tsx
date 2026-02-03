"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function SearchBox({ onScan }: { onScan: (d: string) => void }) {
  const [domain, setDomain] = useState("");

  const handleScan = () => {
    const trimmedDomain = domain.trim() || "vercel.com";
    onScan(trimmedDomain);
    setDomain("");
  };

  return (
    <div className="flex gap-3">
      <Input
        placeholder="vercel.com"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
        className="text-lg"
      />
      <Button size="lg" onClick={handleScan}>
        Scan
      </Button>
    </div>
  );
}
