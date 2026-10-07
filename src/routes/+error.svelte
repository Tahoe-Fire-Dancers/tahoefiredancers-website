<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>{page.status} | Tahoe Fire Dancers</title>
</svelte:head>

<main class="centered">
	<h1>{page.status}</h1>
	<p>{page.status === 404 ? 'Page not found' : 'Something went wrong'}</p>
	<a href="/">Return home</a>
</main>

<style>
	h1 {
		margin: 0;
		font-size: 3rem;
	}

	p {
		margin: 1rem 0 2rem;
	}

	a {
		color: #ffffff;
	}
</style>
