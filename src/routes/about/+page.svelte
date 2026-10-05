<script lang="ts">
	import type { PageData } from './$types';
	import Container from '$lib/components/Container.svelte';
	import { blocksToHtml } from '$lib/utils/portabletext';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{data.title} | Tahoe Fire Dancers</title>
	<meta name="description" content={data.description} />
</svelte:head>

<Container>
	<section class="container mx-auto px-4 py-12 w-full">
		<div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
			<!-- Image -->
			<div class="flex justify-center">
				<img
					src={data.imageUrl}
					alt="About Tahoe Fire Dancers"
					class="w-full max-w-sm rounded-xl shadow-lg"
				/>
			</div>

			<!-- Content -->
			<div>
				<h2 class="text-3xl font-bold text-torange mb-4">{data.title}</h2>
				{#if data.body}
					<div class="text-white leading-relaxed">
						{@html blocksToHtml(data.body)}
					</div>
				{:else}
					<p class="text-white">
						Tahoe Fire Dancers are a professional fire performance group based in the Lake Tahoe
						area. We bring the magic of fire to events of all sizes.
					</p>
				{/if}
			</div>
		</div>

		<!-- Book Us Button -->
		<div class="mt-12 text-center">
			<a href="/book-us">
				<button
					type="button"
					class="text-white bg-torange hover:bg-tblue focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-8 py-3 text-center"
				>
					Book Us
				</button>
			</a>
		</div>
	</section>
</Container>
