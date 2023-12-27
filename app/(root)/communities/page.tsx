import Image from "next/image";
import Link from "next/link";

import { CreateCommunityButton } from "@/components/index";
import { getAllCommunities } from "@/lib/actions/community.action";

export const metadata = {
  title: "Communities",
};

export default async function Communities() {
  const communities = await getAllCommunities();

  return (
    <section className="no-scrollbar w-full p-5">
      <header className="flex items-center justify-between">
        <h1 className="title">Communities</h1>
        {communities.length >= 1 && (
          <div>
            <CreateCommunityButton />
          </div>
        )}
      </header>
      <section className="flex flex-wrap gap-5 py-5">
        {communities.length < 1 && (
          <div className="mt-10 flex h-full w-full flex-col items-center justify-center">
            <h4 className="text-center text-3xl font-bold leading-relaxed text-white  lg:text-4xl">
              There&apos;s no community yet
            </h4>
            <p className="text-base font-medium text-slate-500">
              Create first community
            </p>
            <div className="mt-5">
              <CreateCommunityButton />
            </div>
          </div>
        )}
        {communities.map((community) => (
          <div
            key={community.id}
            className=" w-64 rounded-lg border border-main p-3 max-sm:w-full"
          >
            <header className="flex w-full items-center gap-3">
              <Image
                className=" aspect-square !h-10 !w-10 rounded-full object-cover"
                src={community.logo}
                width={50}
                height={50}
                alt="profile"
              />
              <h2 className="truncate text-lg font-semibold first-letter:capitalize">
                {community.name}
              </h2>
            </header>
            <p className="truncate py-2 text-sm">{community.description}</p>
            <Link
              href={`communities/${community.id}`}
              className="block w-full rounded-lg bg-primary-500 px-3 py-1 text-center text-lg text-white"
            >
              View
            </Link>
          </div>
        ))}
      </section>
    </section>
  );
}
