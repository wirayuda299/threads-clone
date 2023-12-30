import { getSuggestedCommunities } from '@/lib/actions/community.action';
import Image from 'next/image';
import Link from 'next/link';

export default async function SuggestedCommunities() {
	const communities = await getSuggestedCommunities()
	return (
		<aside className=' hidden min-w-[350px] bg-main p-5 lg:sticky lg:top-0 lg:mt-16 lg:!block lg:h-screen'>
			<h2 className='truncate pb-5 text-2xl font-bold'>Suggested Communities</h2>
			<ul className='flex flex-col gap-5'>
				{communities.map((community) => (
					<li
						key={community.name}
						className='flex gap-3 text-lg font-semibold'
					>
						<Image
							src={community.logo}
							width={50}
							height={50}
							alt={community.name}
							className='aspect-auto h-10 w-10 rounded-full object-contain'
						/>
						<div>
							<Link className='truncate text-xl' href={`/communities/${community.id}`}>{community.name}</Link>
							<p className='text-xs text-slate-600'>Created By:<Link href={`/profile/${community.User.id}`}> {community.User.username}</Link></p>
						</div>
					</li>
				))}
			</ul>
		</aside>
	);
}
