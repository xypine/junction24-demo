<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import Button from './ui/button/button.svelte';
	import Checkbox from './ui/checkbox/checkbox.svelte';
	import UserIcon from 'lucide-svelte/icons/user';

	export const parentid = null;
</script>

<Card.Root>
	<form>
		<Card.Content>
			<div class="flex flex-col gap-3">
				<div class="flex gap-4">
					<div
						class="hidden h-12 min-w-12 items-center justify-center rounded-full bg-background md:flex"
					>
						<UserIcon />
					</div>
					<Textarea id="comment" placeholder="Add your comment here!" maxlength="140" />
					<!-- hidden parentid, optional -->
					<input type="hidden" name="parentid" value={parentid} />
				</div>
				<div class="flex w-full flex-wrap justify-between gap-6">
					<!-- checkbox if you want other users to see what you voted -->
					<div>
						<Checkbox name="show-vote" checked />
						<label class="text-sm" for="show-vote">Show your vote with the comment</label>
					</div>
					<Button type="submit" class="rounded-full">Send</Button>
				</div>
			</div>
		</Card.Content>
	</form>
</Card.Root>

<!-- <UserForm /> -->
