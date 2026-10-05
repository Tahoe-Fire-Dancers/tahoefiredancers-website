<script lang="ts">
	import { onMount } from 'svelte';

	let { testimonials = [] }: { testimonials: { title: string; description: string }[] } = $props();

	let currentIndex = $state(0);

	function next() {
		currentIndex = (currentIndex + 1) % testimonials.length;
	}

	function prev() {
		currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
	}

	onMount(() => {
		if (testimonials.length <= 1) return;
		const timer = setInterval(next, 5000);
		return () => clearInterval(timer);
	});
</script>

<div class="relative w-full overflow-hidden rounded-box min-h-[200px]">
	{#each testimonials as testimonial, i (i)}
		<div
			class="flex flex-col items-center justify-center p-6 w-full transition-opacity duration-500"
			style="display: {i === currentIndex ? 'flex' : 'none'};"
		>
			<div class="w-full p-4 text-center rounded-lg text-white">
				{testimonial.description}
			</div>
			<div class="w-full mt-2 text-center p-2 rounded text-torange font-semibold">
				— {testimonial.title}
			</div>
		</div>
	{/each}

	{#if testimonials.length > 1}
		<div class="flex justify-center gap-4 mt-4 pb-4">
			<button onclick={prev} class="btn btn-circle btn-sm bg-black/70 text-white">❮</button>
			<button onclick={next} class="btn btn-circle btn-sm bg-black/70 text-white">❯</button>
		</div>
	{/if}
</div>
