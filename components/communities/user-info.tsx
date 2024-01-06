import Image from "next/image";

import type { User } from "@prisma/client";
import type { ReactNode } from "react";

type Props = {
  user: User;
  children?: ReactNode;
};

export default function UserInfo({ user, children }: Props) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-main p-3">
      <header className="flex  items-center gap-3">
        <Image
          className="rounded-full"
          src={user.image}
          width={50}
          height={50}
          alt="user"
        />
        <h3 className="text-white">{user.username}</h3>
      </header>
      {children}
    </div>
  );
}
