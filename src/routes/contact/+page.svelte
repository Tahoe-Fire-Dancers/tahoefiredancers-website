<script lang="ts">
	import Container from '$lib/components/Container.svelte';
	import ContactForm from '$lib/components/ContactForm.svelte';
</script>

<svelte:head>
	<title>Contact | Tahoe Fire Dancers</title>
	<meta
		name="description"
		content="Get in touch with Tahoe Fire Dancers for bookings and inquiries."
	/>
</svelte:head>

<Container>
	<div class="container mx-auto px-4 py-8 w-full max-w-2xl">
		<h1 class="text-4xl font-bold text-torange text-center mb-8">Contact Us</h1>
		<ContactForm />
	</div>
</Container>
