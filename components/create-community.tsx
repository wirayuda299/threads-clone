"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CreateCommunitiesForm from "./forms/create-communities";
import Image from "next/image";

export default function CreateCommunityButton() {
  return (
    <Dialog>
      <DialogTrigger className="flex items-center gap-3 rounded-lg bg-main p-2">
        <Image
          src={"/assets/create.svg"}
          width={20}
          height={20}
          alt="creates"
        />
        <span className="text-xs">Create</span>
      </DialogTrigger>
      <DialogContent>
        <CreateCommunitiesForm />
      </DialogContent>
    </Dialog>
  );
}
