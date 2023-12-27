import Image from "next/image";

import {
  DeleteCommunityButton,
  JoinButton,
  RenderBaseOnCategory,
  Tab,
  ActionButton,
} from "@/components/index";
import { communityTabs } from "@/constants";
import { getCommunityById } from "@/lib/actions/community.action";
import { getAllUsers, getCurrentUser } from "@/lib/actions/user.action";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function CommunityDetail({ params, searchParams }: Props) {
  const { community, threads } = await getCommunityById(params.id);
  const currentUser = await getCurrentUser();
  const users = await getAllUsers(community.id);

  return (
    <div className="flex h-full w-full grow flex-col overflow-y-auto px-5 pb-24">
      <header className="flex flex-wrap items-center justify-between gap-5 border-b border-main pb-10 pt-5">
        <div className="flex  items-center gap-5">
          <Image
            className="h-20 w-20 rounded-full object-cover md:h-28 md:w-28"
            src={community?.logo ?? ""}
            width={100}
            height={100}
            alt="logo"
            priority
          />
          <div className="truncate">
            <h2 className="truncate bg-gradient-to-r from-primary-500 to-white/50 bg-clip-text text-2xl font-bold capitalize text-transparent lg:text-4xl">
              {community?.name}
            </h2>
            <p className="text-base text-slate-600 first-letter:capitalize">
              {community.description}
            </p>
          </div>
        </div>
        {currentUser.id === community.User.id ? (
          <DeleteCommunityButton id={community.id} />
        ) : (
          <JoinButton community={community} userId={currentUser.id} />
        )}
      </header>
      <Tab tabs={communityTabs} />
      <div className="flex items-center justify-between py-5">
        <ActionButton
          members={community.members}
          userId={currentUser.id}
          users={users!}
          authorId={community.authorId}
          communityId={community.id}
        />
      </div>
      <RenderBaseOnCategory
        // @ts-ignore
        threads={threads}
        admin={community.User}
        members={community.members}
        category={searchParams.category as string}
        communityId={community.id}
      />
    </div>
  );
}
