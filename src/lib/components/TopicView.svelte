<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import type { Conversation } from '@/server/db/schema';
	import type { Snippet } from 'svelte';
    let { discussion, children }: { discussion: Conversation, children: Snippet } = $props();
</script>

<Card.Root class="w-full">
    <Card.Header>
        <Card.Title>{discussion.topic}</Card.Title>
        <Card.Description>discussion</Card.Description>
    </Card.Header>
    <Card.Content>
			{#if discussion.description}
        <p>{discussion.description}</p>
			{:else}
			<p>No Description</p>
			{/if}
		<div class="my-4 flex w-full">
			{@render children?.()}
		</div>
    </Card.Content>
</Card.Root>



<style>
    .padd{
        padding-left: 5px;
        padding-right: 5px;
    }
</style>
