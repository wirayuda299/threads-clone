import type { ReactNode } from "react";

import { Header, Sidebar, SuggestedCommunities } from "@/components/index";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <main className=" h-full w-full max-w-[1470px] overflow-hidden bg-black text-white">
      <Header />
      <section className="flex h-screen w-full">
        <Sidebar />
        <main className="mt-20 w-full">{children}</main>
        <SuggestedCommunities />
      </section>
    </main>
  );
}
