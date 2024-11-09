<script lang="ts">
	import { type Municipality } from "$lib/municipalities";
	import type { Gender } from "$lib/server/db/schema";
	import { GENDERS } from "@/schema_constants";
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from "./ui/button";
	import { Input } from "./ui/input";
	import { Label } from "./ui/label";
	import ComboBox from "./ComboBox.svelte";
	import * as Select from "$lib/components/ui/select/index.js";

	let user_birthyear: number | undefined = $state(undefined);
	let user_municipality: Municipality | undefined = $state(undefined);
	let user_gender: Gender | undefined = $state(undefined);
</script>

<form method="POST" action="/sms?/send">
	<Card.Root>
		<Card.Header>
			<Card.Title>Great! Provide some basic details if you wish.</Card.Title>
			<Card.Description>These are details are only shown to topic creators in an anonymized manner.</Card.Description>
		</Card.Header>
		<Card.Content>
			<fieldset class="flex gap-4">
				<Label class="flex flex-col gap-1">
					<span>Birth Year</span>
					<Input type="number" placeholder="2000" bind:value={user_birthyear} />
				</Label>
				<Label class="flex flex-col gap-1">
					<span>Municipality</span>
					<br />
					<ComboBox placeholder="Not Selected" bind:value={user_municipality} />
				</Label>
				<Label class="flex flex-col gap-1">
					<span>Gender</span>
					<Select.Root type="single" bind:value={user_gender}>
						<Select.Trigger class="w-[180px]">Not Selected</Select.Trigger>
						<Select.Content>
							{#each GENDERS as gender}
								<Select.Item value={gender}>{gender}</Select.Item>
							{/each}
						</Select.Content>
					</Select.Root>
				</Label>
			</fieldset>
		</Card.Content>
		<Card.Footer>
			<Button type="submit">Continue</Button>
		</Card.Footer>
	</Card.Root>
</form>
