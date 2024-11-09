<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import UserIcon from 'lucide-svelte/icons/user';
	import CommentVoting from './CommentVote.svelte';
	import type { Comment } from '@/server/db/schema';
	import type { SessionWithUser } from '@/server/utils';

	//import type { Conversation } from '@/server/db/schema';
	//import { title } from 'process';
	//let { discussion }: { discussion: Conversation } = $props();
	let { comment, user }: { comment: Comment, user: SessionWithUser | null } = $props();
</script>

<Card.Root class="w-full">
	<Card.Header class="flex flex-row gap-2">
		<div class=" flex h-12 min-w-12 items-center justify-center rounded-full bg-background">
			<UserIcon />
		</div>
		<Card.Title>Anonymous</Card.Title>
	</Card.Header>
	<Card.Content>
		<p class="break-all">{comment.content}</p>
		<div class="flex flex-row-reverse justify-between">
			<CommentVoting comment_id={comment.id} {user} />
		</div>
	</Card.Content>
</Card.Root>

<style></style>
