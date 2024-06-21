"use client";

import Link from "next/link";

import { UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <header className="fixed top-0 z-30 flex h-20 w-full items-center justify-between bg-main p-5 text-white">
      <div>
        <Link className="flex items-center gap-3" href="/">

          <h1 className="text-2xl font-semibold">Threads</h1>
        </Link>
      </div>
      <UserButton afterSignOutUrl="/sign-in" />
    </header>
  );
}
