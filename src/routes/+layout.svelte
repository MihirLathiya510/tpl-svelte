<script lang="ts">
	import '../app.css';
	import { browser } from '$app/environment';
	
	let { children } = $props();
	let isDark = $state(true); // Default to dark theme

	// Preload dark mode preference with dark as default
	const preloadTheme = `
		try {
			const theme = localStorage.getItem('theme') ?? 'dark';
			document.documentElement.classList.toggle('dark', theme === 'dark');
		} catch (e) {}
	`;

	function toggleTheme() {
		if (browser) {
			isDark = !isDark;
			document.documentElement.classList.toggle('dark');
			localStorage.setItem('theme', isDark ? 'dark' : 'light');
		}
	}

	$effect(() => {
		if (browser) {
			// Set dark theme by default if no preference is stored
			if (!localStorage.getItem('theme')) {
				document.documentElement.classList.add('dark');
			}
			isDark = document.documentElement.classList.contains('dark');
		}
	});
</script>

<svelte:head>
	<script>{@html preloadTheme}</script>
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous">
	<link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
</svelte:head>

<div class="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
	<button
		class="fixed top-4 right-4 p-2 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 
		       transition-colors duration-200 hover:scale-105 transform"
		onclick={toggleTheme}
		aria-label="Toggle theme"
	>
		<span class="text-xl">
			{#if isDark}
					🌞
			{:else}
				🌙
			{/if}
		</span>
	</button>
	{@render children()}
</div>

<style lang="postcss">
	:global(html) {
		font-family: 'Space Mono', monospace;
	}
</style>
