import { ScanResult, Signal } from "@/lib/types";

const groups = {
  Application: ["framework", "rendering", "frontendWeight", "api"],
  Platform: ["runtime", "platform", "delivery"],
  Security: ["security", "leaks"],
};

export default function StackGrid({ data }: { data: ScanResult }) {
  return (
    <div className=" flex flex-col gap-4">
      <span className=" text-center text-lg font-bold py-6">{data.domain}</span>
      {Object.entries(groups).map(([group, keys]) => {
        const items = data.architecture.filter((s: Signal) =>
          keys.includes(s.key),
        );

        if (!items.length) return null;

        return (
          <div key={group}>
            <h3 className="text-sm text-muted-foreground mb-3">{group}</h3>

            <div className="grid grid-cols-2 gap-4">
              {items.map((s: Signal) => (
                <div
                  key={s.key}
                  className="p-4 border rounded-lg bg-background"
                >
                  <p className="text-xs text-muted-foreground">{s.key}</p>
                  <p className="text-lg font-semibold">{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      <div className="mt-10 p-6 bg-muted rounded-lg">
        <p className="text-sm text-muted-foreground">Modernity</p>
        <p className="text-3xl font-bold">{data.modernity} / 100</p>
      </div>
    </div>
  );
}
