<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import type { Comment } from '@/server/db/schema';
	import Button from './ui/button/button.svelte';
	import Checkbox from './ui/checkbox/checkbox.svelte';
	import UserIcon from 'lucide-svelte/icons/user';

	let { parent_id = undefined }: { parent_id: undefined | Comment['id'] } = $props();
</script>

<Card.Root>
	<form method="POST" action="?/comment">
		<Card.Content>
			<div class="flex flex-col gap-3">
				<div class="flex gap-4">
					<div
						class="hidden h-12 min-w-12 items-center justify-center rounded-full bg-background md:flex"
					>
						<UserIcon />
					</div>
					<Textarea name="comment" placeholder="Add your comment here!" maxlength={140} />
					<!-- hidden parentid, optional -->
					<input type="hidden" name="parent_id" value={parent_id} />
				</div>
				<div class="flex w-full flex-wrap justify-between gap-6">
					<!-- checkbox if you want other users to see what you voted -->
					<label>
						<Checkbox name="show-vote" checked />
						<span class="text-sm">Show your vote with the comment</span>
					</label>
					<Button type="submit" class="rounded-full">Send</Button>
				</div>
			</div>
		</Card.Content>
	</form>
</Card.Root>

<!-- <UserForm /> -->
