'use client';

import { tabsValue } from '@/constants';
import { formUrlQuery } from '@/lib/utils';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Tab() {
	const router = useRouter();
	const params = useSearchParams();

	const handleClick = (value: string) => {
		const path = formUrlQuery(params.toString(), 'category', value);
		router.push(path);
	};
	const category = params.get('category');

	return (
		<section className='flex justify-center mt-5 rounded-lg bg-main'>
			{tabsValue.map((tab) => (
				<button
					onClick={() => handleClick(tab.label)}
					className={`flex items-center transition-colors ease-in-out duration-300 justify-center gap-2 w-full p-4 ${
						tab.label === category ? 'bg-black/50' : ''
					}`}
				>
					<Image
						className='aspect-auto object-contain'
						src={tab.icon}
						width={30}
						height={30}
						alt={tab.label}
					/>
					<span className='font-medium hidden md:block'>{tab.title}</span>
				</button>
			))}
		</section>
	);
}
