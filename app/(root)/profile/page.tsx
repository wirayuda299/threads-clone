import Image from 'next/image';

import { getThreadByCurrentUser } from '@/lib/actions/user.action';
import { Card, Tab } from '@/components/index';

export default async function Profile({
	searchParams,
}: {
	params: { slug: string };
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	const user = await getThreadByCurrentUser();

	return (
		<section className='w-full p-5'>
			<header className='py-10 border-b border-main flex items-center justify-between gap-3'>
				<div className='flex items-center gap-3'>
					<Image
						className='w-20 rounded-full'
						src={user?.image ?? ''}
						width={100}
						height={50}
						alt='user'
						priority
					/>
					<div>
						<h2 className='font-semibold text-2xl lg:text-3xl'>
							{user?.firstName}
						</h2>
						<h3 className='font-medium text-gray-500'>{user?.username}</h3>
					</div>
				</div>
				<button className='bg-main w-14 md:w-20 rounded-lg flex items-center gap-2 py-2 px-3 justify-center'>
					<Image
						src={'/assets/edit.svg'}
						width={20}
						height={20}
						alt='edit icon'
					/>
					<span className='hidden md:block'>Edit</span>
				</button>
			</header>
			<Tab />
			<section className='flex flex-col gap-5 mt-5'>
				{!!searchParams.category
					? user.threads
							.filter((thread) => thread.type === searchParams.category)
							.map((thread) => (
								<Card
									{...thread}
									key={thread.id}
									cardType={(searchParams.category as string) || 'thread'}
									User={user}
								/>
							))
					: user.threads.map((thread) => (
							<Card {...thread} key={thread.id} cardType='thread' User={user} />
					  ))}
			</section>
		</section>
	);
}
