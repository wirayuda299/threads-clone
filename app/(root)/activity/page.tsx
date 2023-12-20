import { Card } from '@/components/index';
import { getActivities } from '@/lib/actions/thread.action';

export default async function Activity() {
	const acitivities = await getActivities();

	return (
		<section className='flex h-full min-h-screen w-full flex-col gap-5 overflow-y-auto px-5 pb-44 pt-5'>
			<h1 className='font-bold text-2xl lg:text-4xl py-5'>Activity</h1>
			{acitivities?.map((activity) => (
				<Card {...activity} key={activity.id} cardType='activity' />
			))}
		</section>
	);
}
