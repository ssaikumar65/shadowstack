import { TechCardSkeleton } from "./TechCardSkeleton";

export default function ResultsSkeleton() {
  return (
    <div className="mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TechCardSkeleton />
        <TechCardSkeleton />
        <TechCardSkeleton />
        <TechCardSkeleton />
      </div>
    </div>
  );
}
