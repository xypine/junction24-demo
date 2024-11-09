<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import Button from './ui/button/button.svelte';
</script>

<Card.Root>
	<form method="POST" action="/sms?/send">
		<Card.Header>
			<Card.Title>Please Authenticate</Card.Title>
		</Card.Header>
		<Card.Content>
			<label for="phonenum"
				>Phone number
				<Input name="to" type="tel" placeholder="+358 12 3456789" />
			</label>
		</Card.Content>
		<Card.Footer>
			<Button type="submit">Send SMS</Button>
		</Card.Footer>
	</form>
</Card.Root>
