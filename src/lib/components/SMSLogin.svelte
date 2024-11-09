<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import Button from './ui/button/button.svelte';
	import { enhance } from '$app/forms';
	import { } from 'os';
</script>

<Card.Root>
	<form
		method="POST"
		action="/sms?/send"
		use:enhance={({ formData, submitter }) => {
			// dummy button to skip verification
			if (submitter?.id === 'dummy') {
				return async ({ result, update }) => {
					if (result) {
						console.log(result);
						if (result.type === "failure" || result.type === "error") {
							// show error message
							alert('Error: ' + result.status);
						}
					}
					await update();
				};
			}

			localStorage.setItem('phone', formData.get('to') as string);

			return async ({ result, update }) => {
				if (result) {
					console.log(result);
					if (result.type === "failure" || result.type === "error") {
						// show error message
						alert('It seems like we\'ve run out of SMS credits! You can still try the app by clicking "No thanks"');
					}
				}
				await update();
			};
		}}
	>
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
			<Button id="dummy" formaction="/sms?/dummy" variant="secondary" type="submit">
				No thanks (generate a fake number and skip verification)
			</Button>
		</Card.Footer>
	</form>
</Card.Root>
