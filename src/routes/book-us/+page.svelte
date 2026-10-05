<script lang="ts">
	import Container from '$lib/components/Container.svelte';
	import BookingForm from '$lib/components/BookingForm.svelte';
</script>

<svelte:head>
	<title>Book Us | Tahoe Fire Dancers</title>
	<meta name="description" content="Book Tahoe Fire Dancers for your next event." />
</svelte:head>

<Container>
	<div class="container mx-auto px-4 py-8 w-full">
		<h1 class="text-4xl font-bold text-torange text-center mb-8">Book Us</h1>
		<BookingForm />
	</div>
</Container>
