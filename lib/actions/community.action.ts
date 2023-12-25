"use server";

import prisma from "@/prisma";
import { getCurrentUser } from "../utils";
import { redirect } from "next/navigation";
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
    redirect("/communities");
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
