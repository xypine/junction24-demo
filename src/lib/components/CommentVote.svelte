<script lang="ts">
	import type { SessionWithUser } from '@/server/utils';
	import ThumbsUp from 'lucide-svelte/icons/thumbs-up';
	import ThumbsDown from 'lucide-svelte/icons/thumbs-down';
	import { Button } from "./ui/button";
	let { comment_id, user }: { comment_id: number, user: SessionWithUser | null } = $props();
	let hasVotedUp = $derived(()=>user?.comment_votes.filter(c=>c.vote==="agree").map(c=>c.comment_id).includes(comment_id));
	let hasVotedDown = $derived(()=>user?.comment_votes.filter(c=>c.vote==="disagree").map(c=>c.comment_id).includes(comment_id));
</script>

<div class="flex gap-1">
	<div class="button padd">
		<form method="POST" action={hasVotedUp() ? "?/vote_null_comment" : "?/vote_up_comment"}>
			<input hidden name="comment_id" value={comment_id} />
			<Button type="submit" variant={hasVotedUp() ? "default" : "secondary"}><ThumbsUp /></Button>
		</form>
	</div>
	<div class="button padd">
		<form method="POST" action={hasVotedDown() ? "?/vote_null_comment" : "?/vote_down_comment"}>
			<input hidden name="comment_id" value={comment_id} />
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
