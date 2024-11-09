<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import type { Conversation } from '@/server/db/schema';
	import type { Snippet } from 'svelte';
	import ConversationVoting from "./ConversationVote.svelte";
	import type { SessionWithUser } from '@/server/utils';
    let { discussion, children, user }: { discussion: Conversation, children: Snippet, user: SessionWithUser | null } = $props();
</script>

<Card.Root class="w-full">
    <Card.Header>
        <Card.Title>{discussion.topic}</Card.Title>
        <Card.Description>discussion</Card.Description>
		  <ConversationVoting discussion_id={discussion.id} {user} />
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
