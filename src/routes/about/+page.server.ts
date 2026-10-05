import type { PageServerLoad } from './$types';
import { getPages } from '$lib/sanity/api';

export const load: PageServerLoad = async () => {
	const pages = await getPages();
	const page = pages.find((p) => p.slug.current === 'about');

	return {
		title: page?.title ?? 'About',
		description: page?.description ?? 'Learn more about Tahoe Fire Dancers',
		body: page?.body ?? null,
		imageUrl:
			'https://cdn.sanity.io/images/8n6kitqe/production/e5d55efb7a69a9770bd4f24625af29b0bd776c68-640x640.jpg'
	};
};
