import { Input } from "@/components/ui/input";
import { scan } from "@/lib/actions";
import { ScanButton } from "@/components/ScanButton";

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto p-10 py-48">
      <p className="text-xl text-muted-foreground mt-2 mb-8 text-center">
        See what companies actually run.
      </p>

      <form action={scan} className="flex gap-3 flex-col">
        <Input
          name="domain"
          required
          placeholder="vercel.com"
          className="text-lg"
        />

        <ScanButton />
      </form>
    </main>
  );
}
