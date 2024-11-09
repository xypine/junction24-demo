<script lang="ts">
	import { enhance } from '$app/forms';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as InputOTP from '$lib/components/ui/input-otp/index.js';
	import Button from './ui/button/button.svelte';

	let phone: string | null = $state(null);
	$effect(() => {
		phone = localStorage.getItem('phone');
	});
</script>

<Card.Root>
	<form
		method="POST"
		action="/sms?/verify"
		use:enhance={() => {
			return async ({ result, update }) => {
				if (result) {
					console.log(result);
					if (result.type === 'error' || result.type === 'failure') {
						alert('Error: incorrect verification code');
						window.location.href = '/sms/verify';
					}
				}
				await update();
			};
		}}
	>
		<Card.Header>
			<Card.Title>Please Enter Your Verification Code</Card.Title>
		</Card.Header>
		<Card.Content class="flex flex-col items-center justify-center gap-6">
			<div>
				<!-- hidden phone number from local storage -->
				<input type="hidden" name="phone" value={phone} />
				<InputOTP.Root maxlength={4} name="code">
					{#snippet children({ cells })}
						<InputOTP.Group>
							{#each cells.slice(0, 4) as cell}
								<InputOTP.Slot {cell} />
							{/each}
						</InputOTP.Group>
					{/snippet}
				</InputOTP.Root>
			</div>
			<Card.Footer>
				<Button type="submit">Submit</Button>
			</Card.Footer>
		</Card.Content>
	</form>
</Card.Root>
