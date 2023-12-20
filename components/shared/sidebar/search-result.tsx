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
				className='rounded-full w-14 h-14'
				src={thread?.User?.image ?? ''}
				width={50}
				height={50}
				alt={thread.captions}
			/>
			<div className='overflow-x-hidden'>
				<h4 className='text-white font-semibold text-2xl'>
					{thread?.User?.name ?? ''}
				</h4>
				<div className='prose truncate overflow-hidden'>
					<Parser content={thread.captions} />
				</div>
			</div>
		</Link>
	);
}
