import { Loader } from '@/components/index';

export default function Loading() {
	return (
		<div className='flex w-full flex-col gap-5 p-5'>
			{[1, 2, 3].map((l) => (
				<Loader key={l} />
			))}
		</div>
	);
}
