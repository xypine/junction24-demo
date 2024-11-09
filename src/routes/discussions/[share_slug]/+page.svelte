<script lang="ts">
	import CommentBox from "$lib/components/CommentBox.svelte";
	import type { PageServerData } from './$types';
	let { data }: { data: PageServerData } = $props();
	const { discussion, comments } = data;
</script>

<h1>{discussion.topic}</h1>
<CommentBox />
{#each comments as comment}
	<p>{comment.content}</p>
{/each}
{#if !comments}
	<p>No Comments – yet</p>
{/if}
