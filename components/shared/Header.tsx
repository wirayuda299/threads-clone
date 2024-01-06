"use client";

import Image from "next/image";
import Link from "next/link";

import { UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <header className="fixed top-0 z-30 flex h-20 w-full items-center justify-between bg-main p-5 text-white">
      <div>
        <Link className="flex items-center gap-3" href="/">
          <Image
            src="/assets/logo.png"
            className="h-7 w-7 object-contain"
            width={35}
            height={35}
            alt="Threads"
          />
          <h1 className="text-2xl font-semibold">Threads</h1>
        </Link>
      </div>
      <UserButton afterSignOutUrl="/sign-in" />
    </header>
  );
}
