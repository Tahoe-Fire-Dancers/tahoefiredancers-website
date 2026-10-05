<script lang="ts">
	let { url = '', title = 'YouTube Video' }: { url?: string; title?: string } = $props();

	function getVideoId(videoUrl: string): string | null {
		const patterns = [
			/youtu\.be\/([^?&]+)/,
			/youtube\.com\/watch\?v=([^&]+)/,
			/youtube\.com\/embed\/([^?&]+)/
		];
		for (const pattern of patterns) {
			const match = videoUrl.match(pattern);
			if (match) return match[1];
		}
		return null;
	}

	const videoId = $derived(getVideoId(url));
</script>

{#if videoId}
	<div class="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg my-4">
		<iframe
			src="https://www.youtube.com/embed/{videoId}"
			{title}
			class="absolute inset-0 w-full h-full"
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowfullscreen
		></iframe>
	</div>
{/if}
