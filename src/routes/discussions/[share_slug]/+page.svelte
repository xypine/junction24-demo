<script lang="ts">
	import CommentBox from '$lib/components/CommentBox.svelte';
	import Comment from '@/components/Comment.svelte';
	import * as Card from '$lib/components/ui/card/index.js';

	import type { PageServerData } from './$types';
	import TopicView from '@/components/TopicView.svelte';
	let { data }: { data: PageServerData } = $props();
	const { discussion, comments, user } = data;
</script>

<div class="flex flex-col w-[min(800px,90vw)]">
	<TopicView {discussion} {user}>
		<div class="flex flex-col w-full">
			<Card.Title>Comments</Card.Title>
			{#each comments as comment}
				<Comment comment={comment} user={user} />
			{/each}
			{#if !comments}
				<p>No Comments – yet</p>
			{/if}
		</div>
	</TopicView>
	<CommentBox />
</div>
