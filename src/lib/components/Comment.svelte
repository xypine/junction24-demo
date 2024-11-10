<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from './ui/button';
	import ThumbsUp from 'lucide-svelte/icons/thumbs-up';
	import ThumbsDown from 'lucide-svelte/icons/thumbs-down';
	import Reply from 'lucide-svelte/icons/reply';
	import SquareMinus from 'lucide-svelte/icons/square-minus';
	import UserIcon from 'lucide-svelte/icons/user';
	import CommentVoting from './CommentVote.svelte';
	import type { Comment } from '@/server/db/schema';
	import type { SessionWithUser } from '@/server/utils';
	import CommentBox from './CommentBox.svelte';
	import { Header } from './ui/dialog';

	//import type { Conversation } from '@/server/db/schema';
	//import { title } from 'process';
	//let { discussion }: { discussion: Conversation } = $props();
	let {
		comment,
		user
	}: {
		comment: Comment & { creator_vote: 'agree' | 'disagree' | null; parent_snippet: string };
		user: SessionWithUser | null;
	} = $props();
	console.log({ comment });
	let replying = $state(false);
	console.log(comment.parent_id);
</script>

<Card.Root class="w-full" id={comment.id}>
	<Card.Header class="flex flex-row gap-2">
		<div class=" flex h-12 min-w-12 items-center justify-center rounded-full bg-background">
			<UserIcon />
		</div>
		<div class="flex flex-col">
			<Card.Title>Anonymous</Card.Title>
			{#if comment.parent_id}
				<Card.CardHeader class="p-0 pt-1">
					<div class="flex gap-1">
						Replying to <a href="#{comment.parent_id}">{comment.parent_id}</a>
					</div>
				</Card.CardHeader>
			{/if}
		</div>
		<div class="flex-grow"></div>
		{#if comment.creator_vote}
			<p class="opacity-80">{comment.creator_vote}s with "{comment.parent_snippet}"</p>
		{/if}
	</Card.Header>
	<Card.Content>
		<p class="break-all">{comment.content}</p>
		<div class="flex flex-row-reverse justify-between">
			<CommentVoting comment_id={comment.id} {user} />
			<div class="flex items-end gap-2">
				<Button variant="ghost" onclick={() => (replying = !replying)}><Reply></Reply></Button>
			</div>
		</div>
		<div hidden={!replying} class="pt-4">
			<CommentBox parent_id={comment.id} class={replying ? 'flex' : 'none'} />
		</div>
	</Card.Content>
</Card.Root>

<style></style>
