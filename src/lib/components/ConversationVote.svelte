<script lang="ts">
	import type { SessionWithUser } from '@/server/utils';
	import ThumbsUp from 'lucide-svelte/icons/thumbs-up';
	import ThumbsDown from 'lucide-svelte/icons/thumbs-down';
	import { Button } from "./ui/button";
	let { discussion_id, user }: { discussion_id: number, user: SessionWithUser | null } = $props();
	let hasVotedUp = $derived(()=>user?.conversation_votes.filter(c=>c.vote==="agree").map(c=>c.conversation_id).includes(discussion_id));
	let hasVotedDown = $derived(()=>user?.conversation_votes.filter(c=>c.vote==="disagree").map(c=>c.conversation_id).includes(discussion_id));
</script>

<div class="flex gap-1">
	<div class="button padd">
		<form method="POST" action={hasVotedUp() ? "?/vote_null_conversation" : "?/vote_up_conversation"}>
			<input hidden name="conversation_id" value={discussion_id} />
			<Button type="submit" variant={hasVotedUp() ? "default" : "secondary"}><ThumbsUp /></Button>
		</form>
	</div>
	<div class="button padd">
		<form method="POST" action={hasVotedDown() ? "?/vote_null_conversation" : "?/vote_down_conversation"}>
			<input hidden name="conversation_id" value={discussion_id} />
			<Button type="submit" variant={hasVotedDown() ? "destructive" : "secondary"}><ThumbsDown /></Button>
		</form>
	</div>
</div>

<style>
    .padd{
        padding-left: 5px;
        padding-right: 5px;
    }
</style>
