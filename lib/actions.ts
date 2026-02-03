"use server";

import { redirect } from "next/navigation";

export async function scan(formData: FormData) {
  const domain = String(formData.get("domain") || "").trim();
  if (!domain) redirect("/");
  redirect(`/${domain}`);
}
