"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

export function ScanButton() {
  const { pending } = useFormStatus();

  return (
    <Button size="lg" type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Analyzing…
        </>
      ) : (
        "Scan"
      )}
    </Button>
  );
}
