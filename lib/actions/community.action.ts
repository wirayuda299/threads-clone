"use server";

import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import prisma from "@/prisma";
import { getCurrentUser } from "./user.action";
import { User } from "@prisma/client";

type CreateCommunityProps = {
  description: string;
  logo: string;
  name: string;
};

export async function createCommunity(data: CreateCommunityProps) {
  try {
    const currentUser = await getCurrentUser();
    await prisma.community.create({
      data: {
        description: data.description,
        logo: data.logo,
        name: data.name,
        userId: currentUser.id,
        authorId: currentUser.id,
      },
    });
    revalidatePath("/communities");
  } catch (error) {
    throw error;
  }
}

export async function getAllCommunities() {
  try {
    return await prisma.community.findMany();
  } catch (error) {
    throw error;
  }
}

export async function getCommunityById(id: string) {
  try {
    const [community, threads] = await prisma.$transaction([
      prisma.community.findUnique({
        where: { id },
        include: {
          members: true,
          User: { select: { username: true, image: true, id: true } },
        },
      }),
      prisma.thread.findMany({
        where: {
          communityId: { hasSome: [id] },
        },
        include: {
          User: {
            select: {
              username: true,
              image: true,
            },
          },
        },
      }),
    ]);
    if (community === null) return notFound();

    return { community, threads };
  } catch (error) {
    throw error;
  }
}

export async function joinCommunity(id: string) {
  try {
    const currentUser = await getCurrentUser();

    const userInDB = await prisma.user.findUnique({
      where: { id: currentUser.id },
    });
    if (!userInDB) return;

    await prisma.community.update({
      where: { id },
      data: {
        members: {
          set: [userInDB],
        },
      },
    });
    revalidatePath(`/communities/${id}`);
  } catch (error) {
    throw error;
  }
}

export async function leaveCommunity(id: string, userId: string) {
  try {
    const community = await prisma.community.findUnique({
      where: { id },
      include: { members: true },
    });
    if (!community) return;

    const index = community?.members.findIndex(
      (member) => member.id === userId
    );
    if (index === -1) throw new Error("You are not member");

    community?.members.splice(index as number, 1);
    await prisma.community.update({
      where: { id },
      data: { members: { set: community?.members } },
    });
    revalidatePath(`/communities/${id}`);
  } catch (error) {
    throw error;
  }
}

export async function deleteCommunity(id: string) {
  try {
    const currentUser = await getCurrentUser();

    const community = await prisma.community.findUnique({ where: { id } });
    if (!community) throw new Error("Community not found");

    if (community.userId === currentUser.id) {
      await prisma.$transaction([
        prisma.community.delete({ where: { id } }),
        prisma.thread.deleteMany({
          where: {
            communityId: {
              hasSome: [id],
            },
          },
        }),
      ]);
    }
    revalidatePath("/communities");
    redirect("/communities");
  } catch (error) {
    throw error;
  }
}

export async function addMember(id: string, user: User) {
  try {
    await prisma.community.update({
      where: {
        id,
      },
      data: {
        members: {
          set: user,
        },
      },
    });
    revalidatePath(`/communities/${id}`);
  } catch (error) {
    throw error;
  }
}
