<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
</script>

<Card.Root>
	<form method="POST">
		<Card.Header>
			<Card.Title>Create a New Discussion Topic</Card.Title>
		</Card.Header>
		<Card.Content>
			<div class="flex flex-col gap-6">
				<div class="option-row w-full">
					<div class="option w-full">
						<Label for="topic">Conversation Topic</Label>
						<Input id="topic" class="w-full" placeholder="Topic"></Input>
					</div>
				</div>
				<div class="option-row w-full">
					<div class="option w-full">
						<Label for="description">Description</Label>
						<Textarea id="description" class="w-full" placeholder="Description"></Textarea>
					</div>
				</div>
				<div class="option-row">
					<div class="option option-same">
						<Checkbox id="can-submit" checked></Checkbox>
						<Label for="can-submit">Participants can submit comments</Label>
					</div>
					<div class="option option-same">
						<Checkbox id="show-unapproved" checked></Checkbox>
						<Label for="show-unapproved">Show unapproved comments</Label>
					</div>
				</div>
			</div>
		</Card.Content>
		<Card.Footer>
			<Button type="submit">Submit</Button>
		</Card.Footer>
	</form>
</Card.Root>

<style>
	.option-row {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		flex-direction: row;
		gap: 2rem;
	}

	.option {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		/* width: 16rem; */
	}
	.option-same {
		flex-direction: row;
		align-items: center;
	}
</style>
