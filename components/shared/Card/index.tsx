import Image from 'next/image';

import ActionButton from './ActionButtons';
import Parser from '../parser';

type CardProps = {
	captions: string;
	id: string;
	likes: string[];
	parentId: string | null;
	cardType: string;
	User: {
		username: string;
		image: string;
	} | null;
};

export default function Card({
	captions,
	id,
	likes,
	parentId,
	cardType,
	User,
}: CardProps) {
	return (
		<article className='rounded-lg bg-main p-5'>
			<div className='flex justify-start gap-4'>
				<header className=' flex min-w-[50px] flex-col items-center'>
					<Image
						className='mb-2 h-12 w-12 rounded-full'
						src={User?.image ?? ''}
						width={40}
						height={40}
						priority
						fetchPriority='high'
						alt='logo'
					/>
					<div className='h-[calc(100%-100px)] w-0.5 bg-gray-600'></div>
				</header>
				<div className='prose flex w-full flex-col'>
					<h2 className='text-xl font-semibold text-white'>
						{User?.username ?? ''}
					</h2>
					<Parser content={captions} />
					<div className='min-h-min'>
						<ActionButton
							id={cardType === 'thread' ? id : parentId ?? id}
							likes={likes}
						/>
					</div>
				</div>
			</div>
		</article>
	);
}
