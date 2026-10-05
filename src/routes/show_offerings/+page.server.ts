import type { PageServerLoad } from './$types';
import { getPhotoGallery } from '$lib/sanity/api';

export const load: PageServerLoad = async () => {
	const photos = await getPhotoGallery();
	return { photos };
};
