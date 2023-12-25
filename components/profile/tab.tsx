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
		<section className='mt-5 flex justify-center rounded-lg bg-main'>
			{tabsValue.map((tab) => (
				<button
					key={tab.label}
					onClick={() => handleClick(tab.label)}
					className={`flex w-full items-center justify-center gap-2 p-4 transition-colors duration-300 ease-in-out ${
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
					<span className='hidden font-medium md:block'>{tab.title}</span>
				</button>
			))}
		</section>
	);
}
