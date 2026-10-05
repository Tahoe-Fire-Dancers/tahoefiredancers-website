<script lang="ts">
	interface GalleryImage {
		src: string;
		alt?: string;
		categories?: { title: string };
	}

	interface GalleryData {
		images?: GalleryImage[];
	}

	let { images = [] }: { images: GalleryData[] } = $props();

	const getImages = $derived(images?.[0]?.images ?? []);

	const categories = $derived([
		'all',
		...new Set(
			getImages
				.flatMap((img) => (img.categories?.title ? [img.categories.title] : []))
		)
	]);

	let selectedCategory = $state('all');
	let selectedImage = $state<string | null>(null);

	const filteredImages = $derived(
		selectedCategory === 'all'
			? getImages
			: getImages.filter((img) => img.categories?.title === selectedCategory)
	);
</script>

<div class="w-full text-center p-4">
	{#if getImages.length === 0}
		<p class="text-white">No images available.</p>
	{:else}
		<!-- Category Filter -->
		<div class="tabs tabs-boxed bg-transparent flex justify-center flex-wrap gap-2 mb-6">
			{#each categories as category (category)}
				<button
					onclick={() => (selectedCategory = category)}
					class={`tab bg-white border border-twhite text-black ${selectedCategory === category ? '!bg-torange !text-white !border-none' : 'hover:bg-blue-200'}`}
				>
					{category}
				</button>
			{/each}
		</div>

		<!-- Image Grid -->
		<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
			{#each filteredImages as image, i (i)}
				<div class="card shadow-md cursor-pointer" onclick={() => (selectedImage = image.src)}>
					<figure>
						<img
							class="w-full aspect-square object-cover rounded-lg transition-transform transform hover:scale-105"
							src={image.src}
							alt={image.categories?.title || 'Gallery image'}
						/>
					</figure>
				</div>
			{/each}
		</div>

		<!-- Lightbox -->
		{#if selectedImage}
			<div
				class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
				onclick={() => (selectedImage = null)}
				role="dialog"
				aria-modal="true"
			>
				<div class="relative max-w-3xl w-full" onclick={(e) => e.stopPropagation()}>
					<button
						class="absolute top-4 right-4 bg-white text-black px-3 py-2 rounded-full shadow-lg hover:bg-gray-200 transition z-10"
						onclick={() => (selectedImage = null)}
					>
						✕
					</button>
					<img
						src={selectedImage}
						class="w-full max-h-[90vh] object-contain rounded-lg shadow-lg"
						alt="Enlarged view"
					/>
				</div>
			</div>
		{/if}
	{/if}
</div>
