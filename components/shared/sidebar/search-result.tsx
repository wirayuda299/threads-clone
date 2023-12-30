import Link from 'next/link';
import Image from 'next/image';

import Parser from '../parser';
import { Thread } from '@/types/threads';

export default function SearchResult({ thread }: { thread: Thread }) {
	return (
		<Link
			href={`thread/${thread.id}`}
			key={thread.id}
			className='flex items-start gap-x-3'
		>
			<Image
				className='h-14 w-14 rounded-full'
				src={thread?.User?.image ?? ''}
				width={50}
				height={50}
				alt={thread.captions}
			/>
			<div className='overflow-x-hidden'>
				<h4 className='text-2xl font-semibold text-white'>
					{thread?.User?.username ?? ''}
				</h4>
				<div className='prose overflow-hidden truncate'>
					<Parser content={thread.captions} />
				</div>
			</div>
		</Link>
	);
}
