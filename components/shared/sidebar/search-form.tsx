import {
	type FormEvent,
	type Dispatch,
	type SetStateAction,
	useState,
	useCallback,
} from 'react';

import { toast } from '@/components/ui/use-toast';
import { searchThread } from '@/lib/actions/thread.action';
import SearchResult from './search-result';
import { Thread } from '@/types/threads';

type SearchFormProps = {
	result: Thread[];
	setResult: Dispatch<SetStateAction<Thread[]>>;
};

export default function SearchForm({ result, setResult }: SearchFormProps) {
	const [loading, setLoading] = useState<boolean>(false);

	async function onSubmit(e: FormEvent) {
		e.preventDefault();

		// @ts-ignore
		if (e.target.search.value !== '') {
			setLoading(true);
			// @ts-ignore
			search(e.target.search.value);
		}
	}

	const search = useCallback(async (q: string) => {
		try {
			setResult([]);
			// @ts-ignore
			setResult(await searchThread(q));
		} catch (error) {
			if (error instanceof Error) {
				toast({
					title: error.message,
					variant: 'destructive',
				});
			}
		} finally {
			setLoading(false);
		}
	}, []);

	return (
		<form onSubmit={onSubmit}>
			<label
				className='block text-white text-2xl font-semibold py-5'
				htmlFor='search'
			>
				Search Thread
			</label>

			<div className='border-b pb-5 border-gray-500 border-opacity-50'>
				<input
					autoComplete='off'
					name='search'
					required
					aria-required
					className='block !bg-gray-500/50 w-full p-3 rounded-lg focus-visible:outline-none text-gray-500 placeholder:text-gray-500 focus:outline-none'
					id='search'
					placeholder='Search...'
				/>
			</div>

			<div className='flex justify-center'>
				{loading && (
					<div className='animate-spin mx-auto w-10 h-10 mt-5 border-t rounded-full'></div>
				)}
			</div>
			<div className='flex flex-col gap-3 mt-5 h-full'>
				{result.map((thread) => (
					<SearchResult thread={thread} key={thread.id} />
				))}
			</div>
		</form>
	);
}
