"use server";

import prisma from "@/prisma";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export async function createUser(
  email: string,
  firstName: string,
  image: string,
  username: string,
  id: string
) {
  try {
    return await prisma.user.create({
      data: { email, firstName, image, bio: "", username, id },
    });
  } catch (error) {
    throw error;
  }
}

export async function getAllUsers(id: string) {
  try {
    const comm = await prisma.community.findUnique({
      where: { id },
    });
    return await prisma.user.findMany({
      where: {
        id: {
          not: comm?.authorId,
        },
      },
    });
  } catch (error) {
    throw error;
  }
}

export async function getCurrentUser() {
  try {
    const user = await currentUser();

    if (user === null) return redirect("/sign-in");
    return user;
  } catch (error) {
    throw error;
  }
}
