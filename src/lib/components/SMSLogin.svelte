<script lang="ts">
	import * as Card from "$lib/components/ui/card/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import Button from "./ui/button/button.svelte";

	let phonenum = $state('');
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Please Authenticate</Card.Title>
	</Card.Header>
	<Card.Content>
		<Input bind:value={phonenum} type="tel" placeholder="+358 12 3456789" />
	</Card.Content>
	<Card.Footer>
		<Button>Send SMS</Button>
	</Card.Footer>
</Card.Root>
