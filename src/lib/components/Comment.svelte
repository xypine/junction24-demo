<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from './ui/button';
	import ThumbsUp from 'lucide-svelte/icons/thumbs-up';
	import ThumbsDown from 'lucide-svelte/icons/thumbs-down';
	import UserIcon from 'lucide-svelte/icons/user';

	//import type { Conversation } from '@/server/db/schema';
	//import { title } from 'process';
	//let { discussion }: { discussion: Conversation } = $props();
	let { comment } = $props();
</script>

<Card.Root class="w-full">
	<Card.Header class="flex flex-row gap-2">
		<div class=" flex h-12 min-w-12 items-center justify-center rounded-full bg-background">
			<UserIcon />
		</div>
		<Card.Title>Anonymous</Card.Title>
	</Card.Header>
	<Card.Content>
		<p class="break-all">{comment}</p>
		<div class="flex flex-row-reverse justify-between">
			<div class="flex items-end gap-2">
				<Button type="submit"><ThumbsUp /></Button>
				<Button type="submit" variant="destructive"><ThumbsDown /></Button>
			</div>
		</div>
	</Card.Content>
</Card.Root>

<style></style>
