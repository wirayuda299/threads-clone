"use server";

import { revalidatePath } from "next/cache";

import prisma from "@/prisma";
import { getCurrentUser } from "../utils";
import { notFound } from "next/navigation";

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
    const community = await prisma.community.findUnique({
      where: { id },
      include: {
        members: true,
        User: { select: { username: true, image: true, id: true } },
      },
    });
    if (community === null) return notFound();

    return community;
  } catch (error) {
    throw error;
  }
}
