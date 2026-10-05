<script lang="ts">
	import { blocksToHtml } from '$lib/utils/portabletext';

	let {
		sidebar,
		imageUrl = 'https://cdn.sanity.io/images/8n6kitqe/production/21e1d88a81e3bdd6a4582cdb4e6339b36034ac72-1080x720.jpg'
	}: { sidebar?: any[]; imageUrl?: string } = $props();
</script>

<div class="card shadow-xl w-full">
	<div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
		<div class="w-full flex justify-center">
			<img
				src={imageUrl}
				alt="About Tahoe Fire Dancers"
				class="rounded-lg shadow-lg max-w-full h-auto object-cover"
			/>
		</div>
		<div class="p-6 text-white">
			{#if sidebar}
				{@html blocksToHtml(sidebar)}
			{/if}
		</div>
	</div>
</div>
