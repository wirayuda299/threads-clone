'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import SearchForm from './search-form';
import { Thread } from '@/types/threads';

type NavLinkProps = {
	route: string;
	label: string;
	imgURL: string;
};

export default function NavLink({ route, label, imgURL }: NavLinkProps) {
	const pathname = usePathname();
	const [result, setResult] = useState<Thread[]>([]);

	return (
		<>
			{route === '/search' ? (
				<Sheet>
					<SheetTrigger
						className={`ease md:w-full inline-flex items-center gap-3 rounded-full p-2 !text-white transition-all duration-300 hover:bg-primary-500  md:rounded-lg lg:p-3 ${
							pathname === route ? 'bg-primary-500' : ''
						}`}
					>
						<Image
							className='h-5 w-5 object-contain'
							src={imgURL}
							width={30}
							height={30}
							alt={label}
						/>
						<span className=' hidden text-white md:!block'>{label}</span>
					</SheetTrigger>

					<SheetContent
						onBlur={() => setResult([])}
						side='left'
						className='overflow-y-auto h-screen'
					>
						<SearchForm result={result} setResult={setResult} />
					</SheetContent>
				</Sheet>
			) : (
				<Link
					href={route}
					className={`ease inline-flex items-center gap-3 rounded-full p-2 !text-white transition-all  duration-300 hover:bg-primary-500 md:w-full md:rounded-lg lg:p-3 ${
						pathname === route ? 'bg-primary-500' : ''
					}`}
					key={label}
				>
					<Image
						className='h-5 w-5 object-contain'
						src={imgURL}
						width={30}
						height={30}
						alt={label}
					/>
					<span className=' hidden text-white md:!block'>{label}</span>
				</Link>
			)}
		</>
	);
}
