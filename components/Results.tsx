import { Signal } from "@/lib/types";
import ArchitectureCard from "./ArchitectureCard";

export default function Results({
  data,
}: {
  data: { architecture: Signal[] };
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      {data.architecture.map((a: Signal) => (
        <ArchitectureCard
          key={a.key}
          label={a.key}
          value={a.value}
          confidence={a.confidence}
        />
      ))}
    </div>
  );
}
