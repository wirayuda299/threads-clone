import { sidebarLinks } from '@/constants';
import NavLink from './nav-link';

export default function Sidebar() {
	return (
		<aside className='fixed inset-x-0 bottom-0 z-20 h-20 bg-main md:sticky md:!top-0 md:mt-20 md:h-screen md:w-full md:max-w-[250px] md:z-0'>
			<nav className='h-full w-full p-5'>
				<ul className='flex h-full w-full items-center justify-evenly md:flex-col  md:justify-start md:gap-6'>
					{sidebarLinks.map((link) => (
						<NavLink {...link} key={link.label} />
					))}
				</ul>
			</nav>
		</aside>
	);
}
