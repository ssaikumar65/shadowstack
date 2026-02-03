"use client";

import ResultsEmpty from "@/components/ResultsEmpty";

export default function Error({ error }: { error: Error }) {
  return (
    <ResultsEmpty
      onExample={() => {
        console.log(error);
      }}
    />
  );
}
