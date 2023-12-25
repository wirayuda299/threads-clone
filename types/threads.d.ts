export type Thread = {
	id: string;
	type: $Enums.Types;
	captions: string;
	likes: string[];
	authorEmail: string;
	parentId: string | null;
	createdAt: Date;
	views: number;
} & User;

type User = {
	User: {
		image: string;
		username: string;
	} | null;
};
