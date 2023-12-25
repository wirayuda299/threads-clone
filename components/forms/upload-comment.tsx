 'use client';

import { useUser } from '@clerk/nextjs';
import { useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { createThread } from '@/lib/actions/thread.action';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';

type FormCommentProps = {
	id: string;
};

export default function FormComment({ id }: FormCommentProps) {
	const { user } = useUser();
	const [isPending, setIsPending] = useState(false);

	const onSubmit = async (data: FormData) => {
		try {
			setIsPending(true);
			await createThread(
				data.get('comment') as string,
				'comment',
				window.location.pathname,
				id
			);
		} catch (error) {
			if (error instanceof Error) {
				toast({
					title: error.message,
					variant: 'destructive',
				});
			}
		} finally {
			setIsPending(false);
		}
	};

	return (
		<section className='mt-8 border-y border-main py-5'>
			<form className='flex items-center' action={onSubmit}>
				<Avatar>
					<AvatarImage
						width={300}
						height={300}
						className='h-12 w-12 rounded-full'
						src={user?.imageUrl!}
					/>
					<AvatarFallback>User</AvatarFallback>
				</Avatar>
				<Input
					name='comment'
					className='!border-none bg-transparent focus-visible:!ring-0 focus-visible:ring-offset-0'
					autoFocus
					placeholder='comment'
				/>
				<Button
					tabIndex={0}
					disabled={isPending}
					type='submit'
					className='rounded-full bg-primary-500 px-8'
				>
					{isPending ? 'Posting...' : 'Reply'}
				</Button>
			</form>
		</section>
	);
}
