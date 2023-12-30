"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SearchForm from "./search-form";
import { Thread } from "@/types/threads";
import { useAuth } from "@clerk/nextjs";

type NavLinkProps = {
  route: string;
  label: string;
  imgURL: string;
};

export default function NavLink({ route, label, imgURL }: NavLinkProps) {
  const pathname = usePathname();
  const user = useAuth();
  const [result, setResult] = useState<Thread[]>([]);

  return (
    <>
      {route === "/search" ? (
        <Sheet>
          <SheetTrigger
            className={`ease inline-flex items-center gap-3 rounded-full p-2.5 !text-white transition-all duration-300 hover:bg-primary-500  md:w-full md:rounded-lg ${pathname === route ? "bg-primary-500" : ""
              }`}
          >
            <Image
              className="aspect-auto h-6 w-6 object-contain"
              src={imgURL}
              width={30}
              height={30}
              alt={label}
            />
            <span className=" hidden text-lg text-white md:!block">{label}</span>
          </SheetTrigger>

          <SheetContent
            onBlur={() => setResult([])}
            side="left"
            className="h-screen overflow-y-auto"
          >
            <SearchForm result={result} setResult={setResult} />
          </SheetContent>
        </Sheet>
      ) : (
        <Link
          href={route === "/profile" ? `/profile/${user.userId}` : route}
          className={`ease inline-flex items-center gap-3 rounded-full p-2.5 !text-white transition-all duration-300 hover:bg-primary-500 md:w-full md:rounded-lg  ${pathname === route ? "bg-primary-500" : ""
            }`}
          key={label}
        >
          <Image
            className="aspect-auto h-6 w-6 object-contain"
            src={imgURL}
            width={30}
            height={30}
            alt={label}
          />
          <span className=" hidden text-lg text-white md:!block">{label}</span>
        </Link>
      )}
    </>
  );
}
