import Image from "next/image";
import { currentUser } from "@clerk/nextjs";
import type { Thread } from "@prisma/client";

import ActionButton from "./ActionButtons";
import DeleteButton from "./delete-button";
import Parser from "../parser";

export default async function Card({
  captions,
  type,
  User,
  id,
  parentId,
  likes,
  isMember,
  userId,
}: Thread & {
  User: {
    username: string;
    image: string;
  } | null;
  isMember?: boolean;
}) {
  const user = await currentUser();

  return (
    <article className="rounded-lg bg-main p-5">
      <div className="flex justify-start gap-4">
        <header className=" flex min-w-[50px] flex-col items-center">
          <Image
            className="mb-2 h-12 w-12 rounded-full object-cover"
            src={User?.image ?? ""}
            width={40}
            height={40}
            priority
            fetchPriority="high"
            alt="logo"
          />
          <div className="!h-full w-0.5 bg-gradient-to-b from-gray-600"></div>
        </header>
        <div className=" flex w-full flex-col">
          <div className="flex  items-start justify-between">
            <h2 className="h-min text-xl font-semibold text-white">
              {User?.username ?? ""}
            </h2>
            {user && user.id === userId && <DeleteButton id={id} />}
          </div>
          <div className="prose flex w-full flex-col">
            <Parser content={captions} />
          </div>
          <div className="min-h-min">
            <ActionButton
              id={type === "thread" ? id : parentId ?? id}
              likes={likes}
              isMember={isMember}
            />
          </div>
        </div>
      </div>
    </article>
  );
}
