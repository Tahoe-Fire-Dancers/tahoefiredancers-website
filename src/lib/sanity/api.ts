import { client } from './client';

export interface SanityImage {
	_type: string;
	_key?: string;
	alt?: string;
	asset?: { _ref: string; _type: string };
}

export interface HeroSlider {
	images?: SanityImage[];
}

export interface Testimonial {
	title: string;
	description: string;
}

export interface SanityPage {
	categories?: { title: string }[];
	testimonials?: Testimonial[];
	date?: string;
	slug: { current: string };
	title: string;
	description?: string;
	featured_image?: SanityImage;
	hero_slider?: HeroSlider;
	left_image?: SanityImage;
	right_image?: SanityImage;
	logo_about?: SanityImage;
	sidebar?: any[];
	picture_gallery?: any[];
	body?: any[];
}

export interface PhotoGalleryItem {
	_id: string;
	_createdAt: string;
	display?: boolean;
	images?: {
		src: string;
		alt?: string;
		categories?: { title: string };
	}[];
}

export async function getPages(): Promise<SanityPage[]> {
	return client.fetch(`*[_type == "pages"]{
		categories[]->{title},
		testimonials[]->{title, description},
		date,
		slug,
		title,
		featured_image,
		hero_slider,
		left_image,
		right_image,
		logo_about,
		sidebar,
		"picture_gallery": picture_gallery[],
		body
	}`);
}

export async function getPhotoGallery(): Promise<PhotoGalleryItem[]> {
	return client.fetch(
		`*[_type == "picture_gallery"]{_id, _createdAt, display, images[]{"src": asset->url, alt, categories->{title}}}`
	);
}
