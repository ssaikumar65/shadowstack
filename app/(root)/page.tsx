import SearchBox from "@/components/SearchBox";

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto p-10">
      <h1 className="text-4xl font-bold text-center">Shadow Stack</h1>
      <p className="text-muted-foreground mt-2 mb-8 text-center">
        See what companies actually run.
      </p>

      <SearchBox />
    </main>
  );
}
