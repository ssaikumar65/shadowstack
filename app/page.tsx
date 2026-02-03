"use client";

import SearchBox from "@/components/SearchBox";
import Results from "@/components/Results";
import { toast } from "sonner";
import ResultsSkeleton from "@/components/ResultsSkeleton";
import { useScan } from "@/lib/hooks/useScan";
import ResultsEmpty from "@/components/ResultsEmpty";

export default function Home() {
  const { isPending, mutate, data, isIdle, isError, isSuccess } = useScan();

  function handleScan(domain: string) {
    mutate(domain, {
      onError: (err: unknown) => {
        toast.error(
          (err as { message?: string })?.message ||
            "An error occurred while scanning",
        );
      },
    });
  }

  return (
    <main className="max-w-4xl mx-auto p-10">
      <h1 className="text-4xl font-bold text-center">Shadow Stack</h1>
      <p className="text-muted-foreground mt-2 mb-8 text-center">
        See what companies actually run.
      </p>

      <SearchBox onScan={handleScan} />

      {isIdle && null}

      {isPending && <ResultsSkeleton />}

      {isError && <ResultsEmpty onExample={handleScan} />}

      {isSuccess && <Results data={data} />}
    </main>
  );
}
