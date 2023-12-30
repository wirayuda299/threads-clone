"use client";

import { deleteCommunity } from "@/lib/actions/community.action";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function DeleteCommunityButton({ id }: { id: string }) {
  const handleDeleteCommunity = async () => {
    try {
      await deleteCommunity(id);
      toast({
        title: "Community has been deleted",
      });
    } catch (error) {
      toast({
        title:
          "Something went wrong when delete community, please try again later",
        variant: "destructive",
      });
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-red-600 px-10 hover:bg-red-600/50">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="border-none bg-main">
        <AlertDialogHeader>
          <AlertDialogTitle className="title">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border-none bg-green-500 !text-white hover:bg-green-500/50">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="border-none bg-red-600 px-10 text-white hover:bg-red-600/50"
            onClick={handleDeleteCommunity}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
