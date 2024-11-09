<script lang="ts">
	import '../app.css';
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import AppSidebar from "$lib/components/app-sidebar.svelte";
	let { data, children }: { data: LayoutData, children: Snippet } = $props();
	import { useSidebar } from "$lib/components/ui/sidebar/index.js";
	let sidebar = useSidebar();
</script>

<Sidebar.Provider>
	<AppSidebar user={data.user} />
		<main>
			<div class="absolute right-0 m-2 md:hidden">
				<Sidebar.Trigger />
			</div>
			{@render children?.()}
		</main>
</Sidebar.Provider>
