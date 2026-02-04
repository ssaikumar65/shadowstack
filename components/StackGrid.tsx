import { ScanResult, Signal } from "@/lib/types";

export default function StackGrid({ data }: { data: ScanResult }) {
  return (
    <div className="flex flex-col">
      <span className=" text-center text-lg font-bold py-8">{data.domain}</span>
      <div className="grid grid-cols-2 gap-6 pb-10">
        {data.architecture.map((s: Signal) => (
          <div key={s.key} className="p-4 border rounded-lg">
            <p className="text-sm text-muted-foreground">{s.key}</p>
            <p className="text-xl font-semibold">{s.value}</p>
          </div>
        ))}

        <div className="col-span-2 mt-6 p-6 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">Modernity</p>
          <p className="text-3xl font-bold">{data.modernity} / 100</p>
        </div>
      </div>
    </div>
  );
}
