"use client";

import SearchBox from "@/components/SearchBox";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  function handleScan(domain: string) {
    router.push(`/${domain}`);
  }

  return (
    <main className="max-w-4xl mx-auto p-10">
      <h1 className="text-4xl font-bold text-center">Shadow Stack</h1>
      <p className="text-muted-foreground mt-2 mb-8 text-center">
        See what companies actually run.
      </p>

      <SearchBox onScan={handleScan} />
    </main>
  );
}
