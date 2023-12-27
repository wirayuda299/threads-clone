"use client";

import Image from "next/image";
import { User } from "@prisma/client";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";

import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { CreateThreadForm } from "@/components/index";
import UserInfo from "./user-info";
import { Button } from "../ui/button";
import { addMember } from "@/lib/actions/community.action";
import { toast } from "../ui/use-toast";

type ActionButtonProps = {
  communityId: string;
  authorId: string;
  users: User[];
  members: User[];
  userId: string;
};

export default function ActionButton({
  authorId,
  communityId,
  users = [],
  members,
  userId,
}: ActionButtonProps) {
  const currentUser = useUser();
  const isMember = members.find((member) => member.id === userId);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMemberOpen, setIsMemberOpen] = useState<boolean>(false);

  if (!currentUser.user) return null;

  const handleAddMember = async (user: User) => {
    try {
      await addMember(communityId, user);
      toast({
        title: "Member has been added",
      });
    } catch (error) {
      toast({
        title: "Something went wrong",
      });
    } finally {
      setIsMemberOpen(false);
    }
  };

  return (
    <>
      {(isMember || currentUser.user.id === authorId) && (
        <Dialog defaultOpen={isOpen} open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger className="flex items-center gap-3 rounded-lg bg-main p-2">
            <Image
              src={"/assets/create.svg"}
              width={20}
              height={20}
              alt="creates"
            />
            <span className="text-xs">Create</span>
          </DialogTrigger>
          <DialogContent className="overflow-y-auto">
            <div className="no-scrollbar h-max max-h-[550px] w-full ">
              <CreateThreadForm
                communityId={communityId}
                setIsOpen={setIsOpen}
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
      {authorId === userId && (
        <Dialog
          defaultOpen={isMemberOpen}
          open={isMemberOpen}
          onOpenChange={setIsMemberOpen}
        >
          <DialogTrigger className="flex items-center gap-3 rounded-lg bg-main p-2 ">
            <Image
              src={"/assets/members.svg"}
              width={20}
              height={20}
              alt="creates"
            />
            <span className="text-xs">Add Member</span>
          </DialogTrigger>
          <DialogContent className="flex max-h-[500px] flex-col  gap-5 overflow-y-auto">
            {users?.map((user) => (
              <UserInfo user={user} key={user.id}>
                <Button
                  onClick={() => handleAddMember(user)}
                  className="bg-primary-500 text-white hover:bg-primary-500/50"
                >
                  Add
                </Button>
              </UserInfo>
            ))}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
