"use client";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

export default function Error() {
  return (
    <Card className="mt-10">
      <CardContent className="flex flex-col items-center text-center gap-4 py-12">
        <AlertTriangle className="h-10 w-10 text-muted-foreground" />
        <h3 className="text-xl font-semibold">No data available</h3>
        <p className="text-muted-foreground">
          We couldn&apos;t find any technology signals for this company.
        </p>
      </CardContent>
    </Card>
  );
}
