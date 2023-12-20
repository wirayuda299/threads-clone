import { cn } from '@/lib/utils';

export default function Loader({ styles }: { styles?: string }) {
	return (
		<div
			className={cn(
				'mt-2 min-h-[240px] w-full flex-1 animate-pulse overflow-hidden rounded-lg bg-main p-5',
				styles
			)}
		></div>
	);
}
