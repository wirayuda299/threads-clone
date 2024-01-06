"use client";

import Image from "next/image";
import { useUser } from "@clerk/nextjs";

import { toast } from "@/components/ui/use-toast";
import { deleteThread } from "@/lib/actions/thread.action";

export default function DeleteButton({
  id,
  authorId,
}: {
  id: string;
  authorId: string;
}) {
  const { user, isLoaded, isSignedIn } = useUser();
  if (!isLoaded || !isSignedIn) return null;

  if (user.id !== authorId) return null;

  async function handleDelete() {
    try {
      await deleteThread(id, window.location.pathname).then(() => {
        toast({
          title: "Thread has been deleted",
        });
      });
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: error.message,
        });
      }
    }
  }
  return (
    <button onClick={handleDelete}>
      <Image
        className="aspect-auto h-3 w-3 object-contain"
        src={"/assets/trash.svg"}
        width={15}
        height={15}
        alt="delete icon"
      />
    </button>
  );
}
