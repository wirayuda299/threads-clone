"use client";

import type { Community, User } from "@prisma/client";
import { useState } from "react";

import { joinCommunity, leaveCommunity } from "@/lib/actions/community.action";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";

export default function JoinButton({
  community,
  userId,
}: {
  community: Community & { members: User[] };
  userId: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const isMember = community.members.find((member) => member.id === userId);

  const handleLeaveCommunity = async () => {
    try {
      setIsLoading(true);
      await leaveCommunity(community.id, userId);
    } catch (error) {
      toast({
        title: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleJoinCommunity = async () => {
    try {
      setIsLoading(true);
      await joinCommunity(community.id);
    } catch (error) {
      toast({
        title: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isMember ? (
        <Button
          aria-disabled={isLoading}
          disabled={isLoading}
          className="bg-main px-10 hover:bg-main/50"
          onClick={handleLeaveCommunity}
        >
          Leave
        </Button>
      ) : (
        <Button
          aria-disabled={isLoading}
          disabled={isLoading}
          className="bg-main px-10 hover:bg-main/50"
          onClick={handleJoinCommunity}
        >
          Join
        </Button>
      )}
    </>
  );
}
