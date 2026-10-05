<script lang="ts">
	import type { PageData } from './$types';
	import HeroSlider from '$lib/components/HeroSlider.svelte';
	import Container from '$lib/components/Container.svelte';
	import Testimonials from '$lib/components/Testimonials.svelte';
	import ContactForm from '$lib/components/ContactForm.svelte';
	import YoutubeEmbed from '$lib/components/YoutubeEmbed.svelte';
	import AboutUs from '$lib/components/AboutUs.svelte';
	import { blocksToHtml } from '$lib/utils/portabletext';

	let { data }: { data: PageData } = $props();

	const youtubeUrl = 'https://youtu.be/ki72Ghrlwhw?si=MmEk7s2VIj0n0HMx';
</script>

<svelte:head>
	<title>{data.title} | Tahoe Fire Dancers</title>
	<meta name="description" content={data.description} />
	<meta property="og:title" content="{data.title} | Tahoe Fire Dancers" />
	<meta property="og:description" content={data.description} />
	<meta property="og:type" content="website" />
</svelte:head>

<HeroSlider images={data.images} interval={4000} />

<Container>
	<div class="container mx-auto mt-4 px-4 md:px-8 w-full">
		<!-- Title -->
		<div class="flex justify-center items-center py-6">
			<h1
				class="text-5xl md:text-6xl lg:text-7xl font-bold text-center text-torange dark:text-white drop-shadow-lg"
			>
				{data.title}
			</h1>
		</div>

		<div class="divider"></div>

		<!-- About Us section -->
		{#if data.sidebar}
			<div class="card shadow-xl p-6 w-full">
				<AboutUs sidebar={data.sidebar} />
			</div>
		{/if}

		<!-- Left & Right Images -->
		{#if data.leftImageUrl || data.rightImageUrl}
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mt-6">
				{#if data.leftImageUrl}
					<div class="flex justify-center">
						<img
							src={data.leftImageUrl}
							class="w-full max-w-lg aspect-square object-cover rounded-lg shadow-lg"
							alt="Performance left"
						/>
					</div>
				{/if}
				{#if data.rightImageUrl}
					<div class="flex justify-center">
						<img
							src={data.rightImageUrl}
							class="w-full max-w-lg aspect-square object-cover rounded-lg shadow-lg"
							alt="Performance right"
						/>
					</div>
				{/if}
			</div>
		{/if}

		<!-- Book Us CTA -->
		<div class="card shadow-xl p-6 mt-6">
			<div class="text-center">
				<h2 class="text-3xl font-semibold text-torange dark:text-white">
					Looking To Book Us Now?
				</h2>
			</div>
			<div class="divider"></div>
			<div class="mt-6 flex justify-center">
				<a href="/book-us">
					<button
						type="button"
						class="text-white bg-torange hover:bg-tblue focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-3 text-center"
					>
						Book Us
					</button>
				</a>
			</div>
		</div>

		<div class="divider"></div>

		<!-- YouTube + Body Content -->
		<div class="card shadow-xl p-6 w-full">
			<YoutubeEmbed url={youtubeUrl} title="Tahoe Fire Dancers - Welcome Video" />
			{#if data.body}
				<div class="text-white mt-4">
					{@html blocksToHtml(data.body)}
				</div>
			{/if}
		</div>

		<div class="divider"></div>

		<!-- Testimonials -->
		{#if data.testimonials && data.testimonials.length > 0}
			<div class="text-center">
				<h2 class="text-3xl font-semibold text-torange dark:text-white">
					What Our Clients Say
				</h2>
			</div>
			<div class="w-full p-6 mt-6 shadow-xl rounded-lg">
				<Testimonials testimonials={data.testimonials} />
			</div>
		{/if}

		<div class="divider"></div>

		<!-- Contact Form -->
		<div class="card shadow-xl p-6">
			<div class="text-center">
				<h2 class="text-3xl font-semibold text-torange dark:text-white">Get in Touch</h2>
			</div>
			<div class="mt-6">
				<ContactForm />
			</div>
		</div>
	</div>
</Container>
