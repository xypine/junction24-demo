<script lang="ts">
	import CommentBox from '$lib/components/CommentBox.svelte';
	import Comment from '@/components/Comment.svelte';
	import * as Card from '$lib/components/ui/card/index.js';

	import type { PageServerData } from './$types';
	let { data }: { data: PageServerData } = $props();
	const { discussion, comments } = data;
</script>

<div class="flex flex-col gap-4 md:w-5/12">
	<h1>{discussion.topic}</h1>
	<Card.Root class="flex flex-col gap-2">
		<Card.Header>
			<Card.Title>Comments</Card.Title>
		</Card.Header>
		<Card.Content class="flex w-full flex-col gap-3">
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
