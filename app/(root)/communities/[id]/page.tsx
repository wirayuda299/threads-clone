import { Tab } from "@/components/index";
import { Button } from "@/components/ui/button";
import { communityTabs } from "@/constants";
import { getCommunityById } from "@/lib/actions/community.action";
import { getCurrentUser } from "@/lib/utils";

import Image from "next/image";
type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function CommunityDetail(props: Props) {
  const community = await getCommunityById(props.params.id);
  const currentUser = await getCurrentUser();

  return (
    <div className="w-full p-5">
      <header className="flex items-center justify-between gap-5 border-b border-main pb-10">
        <div className="flex items-center gap-5">
          <Image
            className="h-20 w-20 rounded-full object-cover md:h-28 md:w-28"
            src={community?.logo ?? ""}
            width={100}
            height={100}
            alt="logo"
            priority
          />
          <div>
            <h2 className="bg-gradient-to-r from-primary-500 to-white/50 bg-clip-text text-2xl font-bold capitalize text-transparent lg:text-4xl">
              {community?.name}
            </h2>
            <p className="text-base text-slate-600 first-letter:capitalize">
              {community.description}
            </p>
          </div>
        </div>
        {currentUser.id === community.User.id ? (
          <Button className="bg-red-600 px-10 hover:bg-red-600/50">
            Delete
          </Button>
        ) : (
          <Button className="bg-main px-10 hover:bg-main/50">Join</Button>
        )}
      </header>
      <Tab tabs={communityTabs} />
    </div>
  );
}
