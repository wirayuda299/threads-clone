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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<form onSubmit={onSubmit}>
			<label
				className='block py-5 text-2xl font-semibold text-white'
				htmlFor='search'
			>
				Search Thread
			</label>

			<div className='border-b border-gray-500/50 pb-5'>
				<input
					autoComplete='off'
					name='search'
					required
					aria-required
					className='block w-full rounded-lg !bg-gray-500/50 p-3 text-gray-500 placeholder:text-gray-500 focus:outline-none focus-visible:outline-none'
					id='search'
					placeholder='Search...'
				/>
			</div>

			<div className='flex justify-center'>
				{loading && (
					<div className='mx-auto mt-5 h-10 w-10 animate-spin rounded-full border-t'></div>
				)}
			</div>
			<div className='mt-5 flex h-full flex-col gap-3'>
				{result.map((thread) => (
					<SearchResult thread={thread} key={thread.id} />
				))}
			</div>
		</form>
	);
}
