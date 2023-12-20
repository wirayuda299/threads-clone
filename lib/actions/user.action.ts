'use server';

import prisma from '@/prisma';
import { getCurrentUser } from '../utils';
import { notFound } from 'next/navigation';
import { Types } from '@prisma/client';

export async function createUser(
	email: string,
	firstName: string,
	image: string,
	username: string,
	id: string
) {
	try {
		return await prisma.user.create({
			data: { email, firstName, image, bio: '', username, id },
		});
	} catch (error) {
		throw error;
	}
}

export async function getThreadByCurrentUser(type: Types = 'thread') {
	try {
		const currentUser = await getCurrentUser();
		const user = await prisma.user.findUnique({
			where: { id: currentUser.id },
			include: { threads: { where: { type } } },
		});

		if (!user) return notFound();

		return user;
	} catch (error) {
		throw error;
	}
}
