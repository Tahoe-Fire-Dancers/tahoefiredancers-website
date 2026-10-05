<script lang="ts">
	import { page } from '$app/state';

	const menuItems = [
		{ title: 'Book Us', href: '/book-us' },
		{ title: 'Show Offerings', href: '/show_offerings' },
		{ title: 'About', href: '/about' }
	];

	let mobileMenuOpen = $state(false);
	let isDark = $state(true);

	let currentPath = $derived(
		page.url.pathname === '/' ? '/' : '/' + page.url.pathname.replace(/^\/+|\/+$/g, '')
	);

	function applyTheme(dark: boolean) {
		isDark = dark;
		document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
		localStorage.setItem('theme', dark ? 'dark' : 'light');
	}

	function toggleTheme() {
		applyTheme(!isDark);
	}

	$effect(() => {
		const stored = localStorage.getItem('theme') ?? 'dark';
		applyTheme(stored === 'dark');
	});
</script>

<!-- Navbar -->
<div
	class="navbar fixed top-0 w-full border-b border-white/20 shadow-lg z-50 text-white bg-transparent backdrop-blur-md"
	data-theme="dark"
>
	<div class="max-w-full px-4 md:px-6 lg:px-8 flex justify-between items-center mx-auto w-full">
		<!-- Logo -->
		<div class="flex items-center">
			<a href="/" class="flex items-center text-primary hover:opacity-80 transition">
				<img src="/tfdlogo.png" class="h-10 w-10 animate-spin-slow" alt="Site Logo" />
				<span
					class={`ml-3 text-xl md:text-2xl font-extrabold tracking-wider uppercase drop-shadow-lg ${currentPath === '/' ? 'text-torange' : 'text-white hover:text-torange/80'}`}
				>
					Tahoe Fire Dancers
				</span>
			</a>
		</div>

		<!-- Desktop Menu -->
		<div class="hidden md:flex space-x-4 text-lg pl-2">
			{#each menuItems as item (item.href)}
				<a
					href={item.href}
					class={`btn btn-ghost text-lg whitespace-nowrap ${currentPath === item.href ? 'bg-torange text-white' : 'hover:bg-torange hover:text-white'}`}
				>
					{item.title}
				</a>
			{/each}
		</div>

		<!-- Theme Toggle (desktop) -->
		<button
			onclick={toggleTheme}
			class="btn btn-ghost ml-4 hidden md:flex text-torange"
			aria-label="Toggle Theme"
		>
			<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
				{#if isDark}
					<path
						d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
					></path>
				{:else}
					<path
						d="M10 2a1 1 0 110 2 6 6 0 106 6 1 1 0 112 0 8 8 0 11-8-8z"
					></path>
				{/if}
			</svg>
		</button>

		<!-- Mobile Menu Button -->
		<button
			onclick={() => (mobileMenuOpen = true)}
			class="btn btn-square btn-ghost md:hidden text-white border border-torange ml-2"
			aria-label="Open Menu"
		>
			<svg
				class="w-6 h-6"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				viewBox="0 0 24 24"
			>
				<path d="M4 6h16M4 12h16M4 18h16"></path>
			</svg>
		</button>
	</div>
</div>

<!-- Mobile Menu Overlay -->
{#if mobileMenuOpen}
	<div
		class="fixed inset-0 bg-black bg-opacity-50 z-40"
		onclick={() => (mobileMenuOpen = false)}
		role="button"
		tabindex="-1"
		onkeydown={(e) => e.key === 'Escape' && (mobileMenuOpen = false)}
	></div>

	<div
		class="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-80 flex flex-col items-center justify-center z-50"
	>
		<ul class="bg-base-100 shadow-lg p-6 rounded-lg text-center w-64">
			{#each menuItems as item (item.href)}
				<li class="mb-4">
					<a
						href={item.href}
						onclick={() => (mobileMenuOpen = false)}
						class="text-lg block hover:bg-primary hover:text-white rounded-lg p-2"
					>
						{item.title}
					</a>
				</li>
			{/each}
			<li>
				<button onclick={toggleTheme} class="btn btn-sm w-full">Toggle Theme</button>
			</li>
			<li class="mt-4">
				<button onclick={() => (mobileMenuOpen = false)} class="btn btn-outline w-full"
					>Close Menu</button
				>
			</li>
		</ul>
	</div>
{/if}

<style>
	@keyframes spin-slow {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
	.animate-spin-slow {
		animation: spin-slow 10s linear infinite;
	}
</style>
