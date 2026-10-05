<script lang="ts">
	import type { PageData } from './$types';
	import Container from '$lib/components/Container.svelte';
	import ImageGallery from '$lib/components/ImageGallery.svelte';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Show Offerings | Tahoe Fire Dancers</title>
	<meta name="description" content="View our fire dancing show offerings and photo gallery." />
</svelte:head>

<Container>
	<div class="container mx-auto px-4 py-8 w-full">
		<h1 class="text-4xl font-bold text-torange text-center mb-8">Show Offerings</h1>
		<ImageGallery images={data.photos} />
	</div>
</Container>
