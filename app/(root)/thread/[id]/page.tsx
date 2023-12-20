import { Card, CommentForm } from '@/components/index';
import { getThreadById } from '@/lib/actions/thread.action';

type Params = {
	params: {
		id: string;
	};
};

export default async function ThreadDetail({ params: { id } }: Params) {
	const { thread, comments } = await getThreadById(id);

	return (
		<div className='h-full w-full flex-1 overflow-y-auto px-8 pb-24 pt-5'>
			<Card {...thread} key={thread.id} cardType='thread' />
			<CommentForm id={id} />
			<section className='pt-5 flex flex-col gap-5'>
				{comments.map((comment) => (
					<Card key={comment.id} {...comment} cardType='comment' />
				))}
			</section>
		</div>
	);
}
