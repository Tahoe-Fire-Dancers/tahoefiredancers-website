<script lang="ts">
	import { onMount } from 'svelte';

	let {
		images = [],
		interval = 5000
	}: { images: { src: string; alt: string }[]; interval?: number } = $props();

	let currentIndex = $state(0);

	function next() {
		currentIndex = (currentIndex + 1) % images.length;
	}

	function prev() {
		currentIndex = (currentIndex - 1 + images.length) % images.length;
	}

	onMount(() => {
		if (images.length <= 1) return;
		const timer = setInterval(next, interval);
		return () => clearInterval(timer);
	});
</script>

<div class="relative w-full overflow-hidden">
	<div class="relative w-full h-screen">
		{#each images as image, i (image.src)}
			<div
				class="absolute inset-0 w-full h-full transition-opacity duration-700"
				style="opacity: {i === currentIndex ? 1 : 0}; z-index: {i === currentIndex ? 10 : 0};"
			>
				<img src={image.src} alt={image.alt} class="w-full h-full object-cover" />
			</div>
		{/each}
	</div>

	{#if images.length > 1}
		<div
			class="absolute top-1/2 left-0 right-0 flex justify-between px-4 -translate-y-1/2 z-20"
		>
			<button onclick={prev} class="btn btn-circle bg-black/70 text-white">❮</button>
			<button onclick={next} class="btn btn-circle bg-black/70 text-white">❯</button>
		</div>
	{/if}
</div>
