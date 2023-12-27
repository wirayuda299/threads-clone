import Image from "next/image";

import ActionButton from "./ActionButtons";
import Parser from "../parser";
import { Thread } from "@prisma/client";

export default function Card({
  captions,
  type,
  User,
  id,
  parentId,
  likes,
  isMember,
}: Thread & {
  User: {
    username: string;
    image: string;
  } | null;
  isMember?: boolean;
}) {
  return (
    <article className="rounded-lg bg-main p-5">
      <div className="flex justify-start gap-4">
        <header className=" flex min-w-[50px] flex-col items-center">
          <Image
            className="mb-2 h-12 w-12 rounded-full"
            src={User?.image ?? ""}
            width={40}
            height={40}
            priority
            fetchPriority="high"
            alt="logo"
          />
          <div className="h-[calc(100%-100px)] w-0.5 bg-gray-600"></div>
        </header>
        <div className="prose flex w-full flex-col">
          <h2 className="text-xl font-semibold text-white">
            {User?.username ?? ""}
          </h2>
          <Parser content={captions} />
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
