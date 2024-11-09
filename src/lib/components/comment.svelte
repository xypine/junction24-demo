<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from "./ui/button";
	import ThumbsUp from 'lucide-svelte/icons/thumbs-up';
	import ThumbsDown from 'lucide-svelte/icons/thumbs-down';
	import SquareMinus from 'lucide-svelte/icons/square-minus';
	//import type { Conversation } from '@/server/db/schema';
	//import { title } from 'process';
	//let { discussion }: { discussion: Conversation } = $props();
</script>

<Card.Root class="w-10/12">
		<Card.Header>
			<Card.Title>User</Card.Title>
            <div class="r">
                <Card.Description>
                    <p class="break-all px-5 py-5">
                        juusto leipä
                    </p>
                </Card.Description>
                <div class="flex items-end py-6">
                    <div class="button">
                        <Button type="submit"><ThumbsUp /></Button>
                    </div>
                    <div class="button">
                        <Button type="submit" variant="secondary"><SquareMinus /></Button>
                    </div>
                    <div class="button">
                        <Button type="submit" variant="destructive"><ThumbsDown /></Button>
                    </div>
                </div>
            </div>
		</Card.Header>
</Card.Root>

<style>
    .r{
        display: flex;
        justify-content: space-between;
        
    }
</style>