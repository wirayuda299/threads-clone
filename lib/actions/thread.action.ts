"use server";

import { revalidatePath } from "next/cache";
import type { Types } from "@prisma/client";
import { notFound } from "next/navigation";

import prisma from "@/prisma";
import { includeAuthorQuery } from "@/lib/utils";
import { getCurrentUser } from "./user.action";

export async function getThreads(page: number = 1) {
  try {
    const [threads, totalPosts] = await prisma.$transaction([
      prisma?.thread.findMany({
        orderBy: { createdAt: "desc" },
        take: 10,
        skip: (page - 1) * 10,
        where: {
          communityId: { isEmpty: true },
          type: "thread",
        },
        ...includeAuthorQuery,
      }),
      prisma.thread.count(),
    ]);

    const totalPages = Math.ceil(totalPosts / 10);
    return { threads, totalPages };
  } catch (error) {
    throw error;
  }
}

export async function likeThread(postId: string, path: string) {
  try {
    const user = await getCurrentUser();

    const thread = await prisma.thread.findFirst({ where: { id: postId } });
    if (!thread) return;

    const idx = thread.likes.findIndex((like) => like === user.id);

    if (idx === -1) {
      thread.likes.push(user.id);
    } else {
      thread.likes.splice(idx, 1);
    }

    await prisma.thread.update({
      where: { id: thread?.id },
      data: {
        likes: {
          set: thread.likes,
        },
      },
    });

    revalidatePath(path);
  } catch (error) {
    throw error;
  }
}

export const getThreadById = async (id: string) => {
  try {
    const [thread, comments] = await prisma?.$transaction([
      prisma.thread.findUnique({
        where: { id },
        ...includeAuthorQuery,
      }),
      prisma.thread.findMany({
        where: { type: "comment", parentId: id },
        orderBy: { createdAt: "desc" },
        ...includeAuthorQuery,
      }),
    ]);

    if (!thread) return notFound();

    return { thread, comments };
  } catch (error) {
    throw error;
  }
};

export async function createThread(
  captions: string,
  type: Types,
  path: string,
  parentId?: string,
  communityId?: string
) {
  try {
    const currentUser = await getCurrentUser();
    await prisma?.thread.create({
      data: {
        captions,
        type,
        ...(parentId && { parentId }),
        ...(communityId && {
          communityId: {
            set: [communityId],
          },
        }),
        userId: currentUser.id,
      },
    });
    revalidatePath(path);
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error: " + error.message);
      throw error;
    }
  }
}

export async function searchThread(search: string) {
  try {
    const threads = await prisma.thread.findMany({
      where: {
        OR: [{ captions: { search } }, { captions: { contains: search } }],
      },
      ...includeAuthorQuery,
    });

    return threads;
  } catch (error) {
    throw error;
  }
}

export async function getActivities() {
  try {
    const user = await getCurrentUser();

    return await prisma?.thread.findMany({
      where: {
        OR: [
          {
            likes: {
              hasSome: [user.id],
            },
          },
          {
            type: "comment",
          },
        ],
      },
      ...includeAuthorQuery,
    });
  } catch (error) {
    throw error;
  }
}

export async function getThreadByCurrentUser(
  type: Types = "thread",
  id: string
) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: { threads: { where: { type } }, communities: true },
    });

    if (!user) return notFound();

    return user;
  } catch (error) {
    throw error;
  }
}

export async function deleteThread(id: string, path: string) {
  try {
    await prisma.thread.delete({ where: { id } });
    revalidatePath(path);
  } catch (error) {
    throw error;
  }
}
