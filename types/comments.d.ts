export type Comments = {
	id: string;
	authorName: string;
	authorImage: string;
	createdAt: string;
	comments: string;
	threadId: string | null;
	likes: string[];
};
