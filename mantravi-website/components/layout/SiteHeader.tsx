import { headers } from "next/headers";
import { Header } from "@/components/layout/Header";

export async function SiteHeader() {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? "/";

  return <Header initialPathname={pathname} />;
}
