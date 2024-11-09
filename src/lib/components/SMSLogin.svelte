<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import Button from './ui/button/button.svelte';
	import { enhance } from '$app/forms';
</script>

<Card.Root>
	<form
		method="POST"
		action="/sms?/send"
		use:enhance={(formData) => {
			// save the form phone number to local storage
			localStorage.setItem('phone', formData.formData.get('to') as string);

			return async ({ result }) => {
				if (result) {
					console.log(result);
					if (result.status === 200) {
						// redirect to the verification page
						window.location.href = '/sms/verify';
					} else {
						// show error message
						alert('Error: ' + result.status);
					}
				}
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
		</Card.Footer>
	</form>

	<form
		method="POST"
		action="/sms?/dummy"
		use:enhance={() => {
			return async ({ result }) => {
				if (result) {
					console.log(result);
					if (result.status === 200) {
						// redirect to the main page
						window.location.href = '/';
					} else {
						// show error message
						alert('Error: ' + result.status);
					}
				}
			};
		}}
	>
		<Button type="submit">No thanks (generate a fake number and skip verification)</Button>
	</form>
</Card.Root>
