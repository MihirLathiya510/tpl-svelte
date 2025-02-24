<script lang="ts">
	let visible = $state(false);
	
	// Show content after a small delay for better animation effect
	setTimeout(() => {
		visible = true;
	}, 100);

	const features = [
		{ icon: '🚀', title: 'SvelteKit 5', desc: 'Latest Svelte with runes & server-side rendering' },
		{ icon: '🛢️', title: 'PostgreSQL + Drizzle', desc: 'Modern database setup with type-safe ORM' },
		{ icon: '🎨', title: 'TailwindCSS', desc: 'With dark mode & custom animations' },
		{ icon: '🐳', title: 'Docker Ready', desc: 'Containerized PostgreSQL database' }
	];
</script>

<main class="container mx-auto px-4 py-8 min-h-screen flex flex-col justify-center items-center">
	<div class="space-y-12 max-w-4xl w-full">
		<div class="text-center space-y-6">
			<div class="relative inline-block">
				<span class="absolute -top-6 left-0 text-xs font-mono text-accent-500">tpl-svelte</span>
				<div class="flex flex-col items-center gap-2">
					<h1 
						class="text-4xl md:text-6xl font-bold bg-gradient-to-r from-accent-500 to-accent-700 
						inline-block text-transparent bg-clip-text overflow-hidden whitespace-nowrap
						animate-type dark:from-accent-400 dark:to-accent-600"
					>
						Modern Svelte Template
					</h1>
					<p class="text-sm font-mono text-gray-500 dark:text-gray-400">
						by <a href="https://github.com/MihirLathiya510" class="text-accent-500 hover:text-accent-600 transition-colors">Mihir Lathiya</a>
					</p>
				</div>
			</div>

			{#if visible}
				<p class="text-xl text-gray-600 dark:text-gray-300 animate-slide-up" style="animation-delay: 1s;">
					Production-ready template with PostgreSQL, Drizzle ORM, and Dark Mode
				</p>

				<div class="flex gap-4 justify-center animate-fade-in" style="animation-delay: 1.5s;">
					<a
						href="https://github.com/MihirLathiya510/tpl-svelte"
						class="px-6 py-3 bg-accent-500 hover:bg-accent-600 text-white rounded-lg 
							transition-all duration-200 transform hover:scale-105 hover:shadow-lg 
							flex items-center gap-2"
					>
						<span class="text-xl">⭐</span> Use Template
					</a>
					<a
						href="/docs"
						class="px-6 py-3 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 
						dark:hover:bg-gray-700 rounded-lg transition-all duration-200 
						transform hover:scale-105 hover:shadow-lg flex items-center gap-2"
					>
						<span class="text-xl">📖</span> Documentation
					</a>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 animate-fade-in" style="animation-delay: 2s;">
					{#each features as { icon, title, desc }}
						<div class="p-6 rounded-xl bg-gray-100 dark:bg-gray-800 hover:scale-105 transition-transform duration-200">
							<span class="text-3xl mb-4 block">{icon}</span>
							<h3 class="text-lg font-bold mb-2">{title}</h3>
							<p class="text-gray-600 dark:text-gray-300">{desc}</p>
						</div>
					{/each}
				</div>

				<div class="mt-16 p-6 rounded-xl bg-gray-100 dark:bg-gray-800/50 animate-fade-in" style="animation-delay: 2.5s;">
					<h2 class="text-lg font-mono mb-4">Quick Start</h2>
					<div class="font-mono text-sm bg-gray-900 text-gray-100 p-4 rounded-lg">
						<p>npm create svelte@latest my-app -- --template https://github.com/user/tpl-svelte</p>
						<p>cd my-app</p>
						<p>npm install</p>
						<p>npm run dev</p>
					</div>
				</div>
			{/if}
		</div>
	</div>
</main>

<style>
	/* Ensure animations only play once */
	.animate-type {
		animation-fill-mode: forwards;
	}
</style>
