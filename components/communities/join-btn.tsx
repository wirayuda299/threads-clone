"use client";

import type { Community, User } from "@prisma/client";

import { joinCommunity, leaveCommunity } from "@/lib/actions/community.action";
import { Button } from "../ui/button";

export default function JoinButton({
  community,
  userId,
}: {
  community: Community & { members: User[] };
  userId: string;
}) {
  const isMember = community.members.find((member) => member.id === userId);

  return (
    <>
      {isMember ? (
        <Button
          className="bg-main px-10 hover:bg-main/50"
          onClick={() => leaveCommunity(community.id, userId)}
        >
          Leave
        </Button>
      ) : (
        <Button
          className="bg-main px-10 hover:bg-main/50"
          onClick={() => joinCommunity(community.id)}
        >
          Join
        </Button>
      )}
    </>
  );
}
