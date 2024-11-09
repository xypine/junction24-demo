<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from './ui/button';
	import ThumbsUp from 'lucide-svelte/icons/thumbs-up';
	import ThumbsDown from 'lucide-svelte/icons/thumbs-down';
	import SquareMinus from 'lucide-svelte/icons/square-minus';
	import UserIcon from 'lucide-svelte/icons/user';

	//import type { Conversation } from '@/server/db/schema';
	//import { title } from 'process';
	//let { discussion }: { discussion: Conversation } = $props();
	let { comment } = $props();
</script>

<Card.Root class="w-full">
	<Card.Header class="flex flex-row gap-2">
		<div
			class="hidden h-12 min-w-12 items-center justify-center rounded-full bg-background md:flex"
		>
			<UserIcon />
		</div>
		<Card.Title>Anonymous</Card.Title>
	</Card.Header>
	<Card.Content>
		<div class="flex justify-between">
			<p class="break-all">{comment}</p>
			<div class="flex items-end gap-2">
				<div class="button">
					<Button type="submit"><ThumbsUp /></Button>
				</div>
				<!-- <div class="button">
					<Button type="submit" variant="secondary"><SquareMinus /></Button>
				</div> -->
				<div class="button">
					<Button type="submit" variant="destructive"><ThumbsDown /></Button>
				</div>
			</div>
		</div>
	</Card.Content>
</Card.Root>

<style></style>
