import Link from "next/link";
import Image from "next/image";

import { Thread } from "@/types/threads";

export default function SearchResult({ thread }: { thread: Thread }) {
  return (
    <Link
      href={`/thread/${thread.id}`}
      key={thread.id}
      className="flex items-start gap-x-3"
    >
      <Image
        className="h-14 w-14 rounded-full"
        src={thread?.User?.image ?? ""}
        width={50}
        height={50}
        alt={thread.User?.image ?? ""}
      />
      <div className="overflow-x-hidden">
        <h4 className="text-xl font-semibold text-white">
          {thread?.User?.username ?? ""}
        </h4>
        <p className="line-clamp-1 text-sm text-white">{thread.captions}</p>
      </div>
    </Link>
  );
}
