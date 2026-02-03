"use client";

import { useScan } from "@/lib/hooks/useScan";
import Results from "@/components/Results";
import ResultsSkeleton from "@/components/ResultsSkeleton";
import ResultsEmpty from "@/components/ResultsEmpty";
import { use } from "react";

export default function ScanPage({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  const { domain } = use(params);
  const scan = useScan(domain);

  return (
    <main className="max-w-4xl mx-auto p-10">
      <h1 className="text-3xl font-bold mb-6">{domain}</h1>

      {scan.isPending && <ResultsSkeleton />}
      {scan.isError && <ResultsEmpty onExample={() => scan.refetch()} />}
      {scan.isSuccess && <Results data={scan.data} />}
    </main>
  );
}
