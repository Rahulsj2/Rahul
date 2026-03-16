"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/Header";
import type { ReactNode } from "react";

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isNasaPage = pathname.startsWith("/nasa");

  if (!isNasaPage) {
    return (
      <>
        <Header />
        <main className="bg-background-primary pt-[4.5rem] md:pt-[5rem]">{children}</main>
      </>
    );
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      <Header />
      <main className="pt-[4.5rem] md:pt-[5rem]">{children}</main>
    </div>
  );
}

