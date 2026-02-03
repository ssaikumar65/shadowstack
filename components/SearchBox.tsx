"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBox() {
  const [domain, setDomain] = useState("");
  const router = useRouter();
  const handleScan = () => {
    const trimmedDomain = domain.trim() || "vercel.com";
    router.push(`/${trimmedDomain}`);
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
