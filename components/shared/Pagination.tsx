'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '../ui/button';
import { formUrlQuery } from '@/lib/utils';

export default function Pagination({ totalPage }: { totalPage: number }) {
	const params = useSearchParams();
	const router = useRouter();
	let page = params.get('page') ?? 1;

	const handlePagination = (direction: string) => {
		if (direction === 'prev') {
			page = +page - 1;
		} else {
			page = +page + 1;
		}

		const newQueryString = formUrlQuery(
			params.toString(),
			'page',
			page.toString()
		);

		router.push(newQueryString);
	};
	return (
		<div className='flex justify-center gap-5'>
			<Button
				disabled={+page === 1}
				className='bg-primary-500 hover:bg-primary-500/50'
				onClick={() => handlePagination('prev')}
			>
				Prev
			</Button>
			<Button
				disabled={page ? +page >= totalPage : false}
				className='bg-primary-500 hover:bg-primary-500/50'
				onClick={() => handlePagination('next')}
			>
				Next
			</Button>
		</div>
	);
}
