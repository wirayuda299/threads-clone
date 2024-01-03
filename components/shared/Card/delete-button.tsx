"use client";

import { toast } from "@/components/ui/use-toast";
import { deleteThread } from "@/lib/actions/thread.action";
import Image from "next/image";

export default function DeleteButton({ id }: { id: string }) {
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
        src={"assets/trash.svg"}
        width={15}
        height={15}
        alt="delete icon"
      />
    </button>
  );
}
