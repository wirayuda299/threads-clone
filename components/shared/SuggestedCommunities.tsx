import Image from 'next/image';

export default function SuggestedCommunities() {
	const communities = [
		{
			label: 'Twitter',
			logo: '/assets/twitter.png',
		},
		{
			label: 'Instagram',
			logo: '/assets/instagram.png',
		},
		{
			label: 'Youtube',
			logo: '/assets/yt.png',
		},
	];

	return (
		<aside className=' hidden min-w-[300px] bg-main p-5 lg:!block lg:h-screen lg:sticky lg:top-0 lg:mt-20'>
			<h2 className='pb-5 text-2xl font-semibold'>Suggested Communities</h2>
			<ul className='flex flex-col gap-5'>
				{communities.map((community) => (
					<li
						key={community.label}
						className='flex items-center gap-3 text-lg font-semibold'
					>
						<Image
							src={community.logo}
							width={50}
							height={50}
							alt={community.label}
							className='h-10 w-10 object-contain'
						/>
						{community.label}
					</li>
				))}
			</ul>
		</aside>
	);
}
