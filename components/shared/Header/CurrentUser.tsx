'use client';

import { UserButton, useUser } from '@clerk/nextjs';

export default function CurrentUser() {
	const { isLoaded, isSignedIn } = useUser();

	if (!isLoaded || !isSignedIn) {
		return null;
	}
	return (
		<div>
			<UserButton afterSignOutUrl='/' />
		</div>
	);
}
