'use server';

import { revalidatePath } from 'next/cache';
import { notFound, redirect } from 'next/navigation';
import type { Types } from '@prisma/client';

import prisma from '@/prisma';
import { getCurrentUser, includeAuthorQuery, threadLikesQuery } from '../utils';

export async function getThreads(page: number = 1) {
	try {
		const totalPosts = await prisma?.thread?.count();
		const totalPages = Math.ceil(totalPosts / 10);

		const threads = await prisma?.thread.findMany({
			orderBy: { createdAt: 'desc' },
			take: 10,
			skip: (page - 1) * 10,
			where: { type: 'thread' },
			...includeAuthorQuery,
			cacheStrategy: { ttl: 10, swr: 10 },
		});

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

		const q = { where: { id: thread?.id } } as const;
		const likesQuery = threadLikesQuery(thread!, user);
		await prisma.thread.update({ ...q, ...likesQuery });

		revalidatePath(path);
	} catch (error) {
		throw error;
	}
}

export const getThreadById = async (id: string) => {
	try {
		const [thread, comments] = await prisma?.$transaction([
			prisma.thread.findUnique({ where: { id }, ...includeAuthorQuery }),
			prisma.thread.findMany({
				where: { type: 'comment', parentId: id },
				orderBy: { createdAt: 'desc' },
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
	parentId?: string
) {
	try {
		const currentUser = await getCurrentUser();
		await prisma?.thread.create({
			data: {
				captions,
				type,
				...(parentId && { parentId }),
				userId: currentUser.id,
			},
		});
		revalidatePath(path);
		if (type === 'thread') redirect('/');
	} catch (error) {
		throw error;
	}
}

export async function searchThread(search: string) {
	try {
		const threads = await prisma.thread.findMany({
			where: { captions: { search }, type: 'thread' },
			...includeAuthorQuery,
			orderBy: {
				_relevance: {
					search,
					fields: 'captions',
					sort: 'asc',
				},
			},
			cacheStrategy: { ttl: 20, swr: 20 },
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
						type: 'comment',
					},
				],
			},
			...includeAuthorQuery,
		});
	} catch (error) {
		throw error;
	}
}
