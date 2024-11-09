<script lang="ts">
	import '../app.css';
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	let { data, children }: { data: LayoutData, children: Snippet } = $props();
</script>

<div class="h-screen p-4">
	{@render children()}
</div>
