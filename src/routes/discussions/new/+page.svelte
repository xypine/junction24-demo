<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
</script>

<Card.Root>
	<form>
		<Card.Header>
			<Card.Title>Create a New Discussion Topic</Card.Title>
		</Card.Header>
		<Card.Content>
			<div class="flex flex-col gap-6">
				<div class="option-row">
					<div class="option">
						<Label for="topic">Conversation Topic</Label>
						<Input id="topic" placeholder="Topic"></Input>
					</div>
					<div class="option">
						<Label for="description">Description</Label>
						<Input id="description" placeholder="Description"></Input>
					</div>
				</div>
				<div class="option-row">
					<div class="option">
						<Label for="can-submit">Participants can submit comments</Label>
						<Checkbox id="can-submit"></Checkbox>
					</div>
					<div class="option">
						<Label for="show-unapproved">Show unapproved comments</Label>
						<Checkbox id="show-unapproved"></Checkbox>
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
		gap: 1rem;
	}

	.option {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		width: 16rem;
	}
</style>
