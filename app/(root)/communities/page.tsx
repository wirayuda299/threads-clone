import Image from "next/image";
import Link from "next/link";

import { CreateCommunityButton } from "@/components/index";
import { getAllCommunities } from "@/lib/actions/community.action";

export const metadata = {
  title: "Communities ",
};

export default async function Communities() {
  const communities = await getAllCommunities();

  return (
    <section className="w-full p-5">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold lg:text-3xl">Communities</h1>
        <div>
          <CreateCommunityButton />
        </div>
      </header>
      <section className="flex flex-wrap gap-5 py-5">
        {communities.map((community) => (
          <div
            key={community.id}
            className=" w-full max-w-64 rounded-lg border border-main p-3"
          >
            <header className="flex w-full items-center gap-3">
              <Image
                className="aspect-auto h-8 w-8 rounded-full object-contain"
                src={community.logo}
                width={50}
                height={50}
                alt="profile"
              />
              <h2 className="truncate text-lg font-semibold">
                {community.name}
              </h2>
            </header>
            <p className="truncate py-2 text-sm">{community.description}</p>
            <Link
              href={`community/${community.id}`}
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
