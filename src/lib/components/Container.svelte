<script lang="ts">
	let { children } = $props();
</script>

<div
	class="flex w-full flex-col border-opacity-50 min-h-screen pt-16 md:pt-20 px-0 text-white rounded-lg shadow-xl backdrop-blur-lg"
>
	<div class="card rounded-box grid h-full place-items-center p-0 shadow-lg w-full">
		{@render children()}
	</div>
</div>
