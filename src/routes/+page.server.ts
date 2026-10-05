import type { PageServerLoad } from './$types';
import { getPages } from '$lib/sanity/api';
import { urlFor } from '$lib/sanity/image';

export const load: PageServerLoad = async () => {
	const pages = await getPages();
	const page = pages.find((p) => p.slug.current === '_index');

	if (!page) {
		return {
			title: 'Tahoe Fire Dancers',
			description: 'Tahoe Fire Dancers - Professional fire performance artists',
			images: [] as { src: string; alt: string }[],
			testimonials: [] as { title: string; description: string }[],
			sidebar: null,
			leftImageUrl: null as string | null,
			rightImageUrl: null as string | null,
			body: null
		};
	}

	const images =
		page.hero_slider?.images?.map((img: any) => ({
			src: urlFor(img).url(),
			alt: img.alt || 'Gallery Image'
		})) ?? [];

	const leftImageUrl = page.left_image ? urlFor(page.left_image).url() : null;
	const rightImageUrl = page.right_image ? urlFor(page.right_image).url() : null;

	return {
		title: page.title,
		description:
			page.description ?? 'Fire Dancers are an awesome group of very talented artists!',
		images,
		testimonials: page.testimonials ?? [],
		sidebar: page.sidebar ?? null,
		leftImageUrl,
		rightImageUrl,
		body: page.body ?? null
	};
};
