<script lang="ts">
	import CommentBox from '$lib/components/CommentBox.svelte';
	import Comment from '@/components/Comment.svelte';
	import * as Card from '$lib/components/ui/card/index.js';

	import type { PageServerData } from './$types';
	let { data }: { data: PageServerData } = $props();
	const { discussion, comments } = data;
</script>

<div class="flex flex-col">
	<h1>{discussion.topic}</h1>
	<Card.Root>
		<Card.Header>
			<Card.Title>Comments</Card.Title>
		</Card.Header>
		<Card.Content>
			{#each comments as comment}
				<Comment comment={comment.content} />
			{/each}
			{#if !comments}
				<p>No Comments – yet</p>
			{/if}
		</Card.Content>
	</Card.Root>
	<CommentBox />
</div>
