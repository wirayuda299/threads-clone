"use client";

import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

import { likeThread } from "@/lib/actions/thread.action";
import { cn } from "@/lib/utils";

type ActionButtonProps = {
  id: string;
  likes: string[];
  isMember?: boolean;
};

export default function ActionButton({
  id,
  likes,
  isMember,
}: ActionButtonProps) {
  const { userId } = useAuth();
  const isLikedByCurrentUser = likes.includes(userId!);
  if (isMember !== undefined && !isMember) return null;

  return (
    <div className="mt-3 inline-flex items-center gap-x-3 ">
      <button onClick={() => likeThread(id, window.location.pathname)}>
        <Image
          className={cn("grayscale", isLikedByCurrentUser && "grayscale-0")}
          src={"/assets/heart-gray.svg"}
          alt={"heart icon"}
          width={30}
          height={30}
        />
      </button>
      <Link href={`/thread/${id}`}>
        <Image
          className="aspect-auto h-[30px] w-[30px] object-contain"
          src={"/assets/reply.svg"}
          alt="chat icon"
          width={30}
          height={30}
        />
      </Link>
      <button>
        <Image
          className="aspect-auto h-[30px] w-[30px] object-contain"
          src={"/assets/repost.svg"}
          alt="repost icon"
          width={30}
          height={30}
        />
      </button>
      <button>
        <Image
          className="aspect-auto h-[30px] w-[30px] object-contain"
          src={"/assets/share.svg"}
          alt="repost icon"
          width={30}
          height={30}
        />
      </button>
    </div>
  );
}
