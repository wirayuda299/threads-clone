import Image from "next/image";

import { getThreadByCurrentUser } from "@/lib/actions/thread.action";
import { Card, Tab } from "@/components/index";
import { getCurrentUser } from "@/lib/utils";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata() {
  const user = await getCurrentUser();
  return {
    title: user.username ?? user.firstName ?? user.lastName,
  };
}

export default async function Profile({ searchParams }: Props) {
  const user = await getThreadByCurrentUser();

  return (
    <section className="w-full p-5">
      <header className="flex items-center justify-between gap-3 border-b border-main py-10">
        <div className="flex items-center gap-3">
          <Image
            className="w-20 rounded-full"
            src={user?.image ?? ""}
            width={100}
            height={50}
            alt="user"
            priority
          />
          <div>
            <h2 className="text-2xl font-semibold lg:text-3xl">
              {user?.firstName}
            </h2>
            <h3 className="font-medium text-gray-500">{user?.username}</h3>
          </div>
        </div>
        <button className="flex w-14 items-center justify-center gap-2 rounded-lg bg-main px-3 py-2 md:w-20">
          <Image
            src={"/assets/edit.svg"}
            width={20}
            height={20}
            alt="edit icon"
          />
          <span className="hidden md:block">Edit</span>
        </button>
      </header>
      <Tab />
      <section className="mt-5 flex flex-col gap-5">
        {searchParams.category
          ? user.threads
              .filter((thread) => thread.type === searchParams.category)
              .map((thread) => (
                <Card
                  {...thread}
                  key={thread.id}
                  cardType={(searchParams.category as string) || "thread"}
                  User={user}
                />
              ))
          : user.threads.map((thread) => (
              <Card {...thread} key={thread.id} cardType="thread" User={user} />
            ))}
      </section>
    </section>
  );
}
