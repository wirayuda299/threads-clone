import type { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<section className='flex min-h-screen items-center justify-center'>
			{children}
		</section>
	);
}
