<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from "./ui/button";
	import ThumbsUp from 'lucide-svelte/icons/thumbs-up';
	import ThumbsDown from 'lucide-svelte/icons/thumbs-down';
	import SquareMinus from 'lucide-svelte/icons/square-minus';
	import type { Conversation } from '@/server/db/schema';
	let { discussion }: { discussion: Conversation } = $props();
</script>

<Card.Root class="w-10/12">
		<Card.Header>
			<Card.Title>{discussion.topic}</Card.Title>
			<Card.Description>{discussion.description}</Card.Description>
		</Card.Header>
    <Card.Content>
        <p>{discussion.description}</p>
    </Card.Content>
    <Card.Footer class="footer">
        <div class="button padd">
            <Button type="submit"><ThumbsUp /></Button>
        </div>
        <div class="button padd">
            <Button type="submit" variant="secondary"><SquareMinus /></Button>
        </div>
        <div class="button padd">
            <Button type="submit" variant="destructive"><ThumbsDown /></Button>
        </div>
			<div class="flex-grow"></div>
			<a class="underline" href={`/discussions/${discussion.share_slug}`}>
				a million comments
			</a>
    </Card.Footer>
</Card.Root>


<style>
    .padd{
        padding-left: 5px;
        padding-right: 5px;
    }
</style>
