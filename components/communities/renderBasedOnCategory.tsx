"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import type { Thread, User } from "@prisma/client";

import { Card } from "../index";
import UserInfo from "./user-info";
import { Button } from "../ui/button";
import { leaveCommunity } from "@/lib/actions/community.action";
import { toast } from "../ui/use-toast";

interface UserDesc {
  User: { username: string; image: string; id: string };
}

type ThreadTypes = Thread & Omit<UserDesc, "id">;

type CategoryProps = {
  threads: ThreadTypes[];
  category?: string;
  members: User[];
  admin: UserDesc["User"];
  communityId: string;
};
export default function RenderComponentBasedOnCategory({
  category,
  threads,
  admin,
  members,
  communityId,
}: CategoryProps) {
  const { user, isLoaded, isSignedIn } = useUser();
  if (!isLoaded || !isSignedIn) return null;

  const isMember = members.map((member) => member.id).includes(user.id);
  const isCurrentUserAdmin = admin.id === user.id;

  const handleRemoveMember = async (id: string) => {
    try {
      await leaveCommunity(communityId, id);
      toast({
        title: "Member has been removed",
      });
    } catch (error) {
      toast({
        title: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      {(!category || category === "thread") && (
        <div className="flex flex-col gap-5">
          {threads.map((thread) => (
            <Card
              {...thread}
              key={thread.id}
              isMember={isCurrentUserAdmin || isMember}
            />
          ))}
        </div>
      )}
      {category && category === "members" && (
        <div>
          {members.map((member) => (
            <UserInfo user={member} key={member.id}>
              {admin.id === user.id ? (
                <Button
                  onClick={() => handleRemoveMember(member.id)}
                  className="bg-primary-500 text-white hover:bg-primary-500/50"
                >
                  Remove Member
                </Button>
              ) : (
                <Button className="bg-primary-500 text-white hover:bg-primary-500/50">
                  Follow
                </Button>
              )}
            </UserInfo>
          ))}
        </div>
      )}
      {category && category === "admin" && (
        <UserInfo user={admin as unknown as User}>
          <Link
            href={`/profile/${admin.id}`}
            className="mt-3 block w-full max-w-[150px] rounded-lg bg-primary-500 p-1 text-center text-lg"
          >
            Visit
          </Link>
        </UserInfo>
      )}
    </>
  );
}
