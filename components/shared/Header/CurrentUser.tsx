"use client";

import { UserButton, useUser } from "@clerk/nextjs";

export default function CurrentUser() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) return null;

  return (
    <div className="flex items-center gap-3">
      <h2 className="truncate bg-gradient-to-r from-primary-500 to-white bg-clip-text text-2xl font-bold capitalize text-transparent">
        {user.username ?? user.firstName ?? user.lastName}
      </h2>
      <UserButton afterSignOutUrl="/sign-in" />
    </div>
  );
}
