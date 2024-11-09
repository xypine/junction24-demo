<script lang="ts">
	import '../app.css';
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	let { data, children }: { data: LayoutData; children: Snippet } = $props();
	import { useSidebar } from '$lib/components/ui/sidebar/index.js';
	let sidebar = useSidebar();
</script>

<Sidebar.Provider>
	<AppSidebar user={data.user} />
	<main class="w-full">
		<div class="absolute right-0 m-2 md:hidden">
			<Sidebar.Trigger />
		</div>
		<div class="m-8 flex justify-center">
			{@render children?.()}
		</div>
	</main>
</Sidebar.Provider>

<style>
	main {
		display: flex;
		flex-direction: column;
		margin-left: auto;
		margin-right: auto;
	}
</style>
