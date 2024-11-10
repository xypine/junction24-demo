<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import ConversationVoting from './ConversationVote.svelte';
	import type { Conversation } from '@/server/db/schema';
	import type { SessionWithUser } from '@/server/utils';
	let {
		discussion,
		user
	}: { discussion: Conversation & { comments: number }; user: SessionWithUser | null } = $props();
</script>

<Card.Root class="w-10/12">
	<Card.Header>
		<Card.Title>{discussion.topic}</Card.Title>
		<Card.Description>discussion</Card.Description>
	</Card.Header>
	<Card.Content>
		<p>{discussion.description}</p>
	</Card.Content>
	<Card.Footer class="footer">
		<ConversationVoting discussion_id={discussion.id} {user} />
		<div class="flex-grow"></div>
		<a class="underline" href={`/discussions/${discussion.share_slug}`}>
			{#if discussion.comments === 1}
				{discussion.comments} comment
			{:else if discussion.comments}
				{discussion.comments} comments
			{:else}
				no comments
			{/if}
		</a>
	</Card.Footer>
</Card.Root>
