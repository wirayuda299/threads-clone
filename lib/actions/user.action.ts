"use server";

import prisma from "@/prisma";

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
