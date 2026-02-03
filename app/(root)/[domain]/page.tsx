import { scan } from "@/lib/scan";
import Results from "@/components/Results";

export default async function Page({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  const { domain } = await params;

  const data = await scan(domain);

  return <Results data={data} />;
}
