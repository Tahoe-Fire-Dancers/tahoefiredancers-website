<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();
</script>

<div class="min-h-screen flex flex-col relative w-full">
	<!-- Full-screen background -->
	<div
		class="fixed inset-0 -z-10 h-full w-full bg-cover bg-center bg-no-repeat"
		style="background-image: url('/twdbg.png');"
	></div>

	<Header />

	<main class="flex-grow w-full">
		{@render children()}
	</main>

	<Footer />
</div>
