<script lang="ts">
	import type { PageServerData } from './$types';
	import FeedTopic from '$lib/components/FeedTopic.svelte';
	let { data }: { data: PageServerData } = $props();
</script>

<div class="flex flex-col gap-2 w-[min(800px,90vw)]">
	<h1 class="text-2xl">Open Discussions</h1>
	{#each data.discussions as discussion}
		<FeedTopic {discussion} />
	{/each}
	{#if !data.discussions}
		<p>No discussions</p>
	{/if}
</div>
