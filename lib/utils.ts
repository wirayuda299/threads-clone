import { type ClassValue, clsx } from 'clsx';
import { redirect } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import { currentUser } from '@clerk/nextjs';
import queryString from 'query-string';
import type { User } from '@clerk/nextjs/server';
import type { Thread } from '@prisma/client';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const formUrlQuery = (params: string, key: string, value: string) => {
	const currentUrl = queryString.parse(params as string);

	currentUrl[key] = value;

	return queryString.stringifyUrl(
		{
			url: window.location.pathname,
			query: currentUrl,
		},
		{ skipNull: true, strict: true }
	);
};

export async function getCurrentUser() {
	try {
		const user = await currentUser();

		if (user === null) return redirect('/sign-in');
		return user;
	} catch (error) {
		throw error;
	}
}

export const includeAuthorQuery = {
	include: {
		User: {
			select: {
				image: true,
				username: true,
			},
		},
	},
} as const;

export const threadLikesQuery = (thread: Thread, user: User) => {
	const isLikedByCurrentUser = thread?.likes.includes(user.id);
	return {
		data: {
			likes: {
				...(isLikedByCurrentUser
					? {
							set: thread?.likes.filter((id) => id !== user.id),
					  }
					: {
							push: user.id,
					  }),
			},
		},
	};
};
