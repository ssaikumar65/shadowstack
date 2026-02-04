import { scan } from "@/lib/scan";
import StackGrid from "@/components/StackGrid";

export default async function Page({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  const { domain } = await params;

  const data = await scan(domain);

  return <StackGrid data={data} />;
}
