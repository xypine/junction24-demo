<script lang="ts">
	import { type Municipality } from "$lib/municipalities";
	import type { Gender, User } from "$lib/server/db/schema";
	import { GENDERS } from "@/schema_constants";
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from "./ui/button";
	import { Input } from "./ui/input";
	import { Label } from "./ui/label";
	import ComboBox from "./ComboBox.svelte";
	import * as Select from "$lib/components/ui/select/index.js";

	let { existing }: { existing: User | null } = $props();

	let user_birthyear: number | undefined = $state(existing?.birthyear ?? undefined);
	let user_municipality: Municipality | undefined = $state(existing?.municipality as Municipality ?? undefined);
	let user_gender: Gender | undefined = $state(existing?.gender ?? undefined);
</script>

<form method="POST" action="?/update_details">
	<Card.Root>
		<Card.Header>
			<Card.Title>Provide some basic details if you wish</Card.Title>
			<Card.Description>These are only shown to topic creators in an anonymized manner and are used to suggest you topics.</Card.Description>
		</Card.Header>
		<Card.Content>
			<fieldset class="flex flex-wrap gap-4">
				<Label class="flex flex-col gap-1">
					<span>Birth Year</span>
					<Input name="birthyear" type="number" placeholder="2000" min={1900} max={2024} bind:value={user_birthyear} />
				</Label>
				<Label class="flex flex-col gap-1">
					<span>Municipality</span>
					<ComboBox name="municipality" placeholder="Not Selected" bind:value={user_municipality} />
				</Label>
				<Label class="flex flex-col gap-1">
					<span>Gender</span>
					<Select.Root name="gender" type="single" bind:value={user_gender}>
						<Select.Trigger class="w-[180px]">{user_gender || "Not Selected"}</Select.Trigger>
						<Select.Content>
							{#each GENDERS as gender}
								<Select.Item value={gender}>{gender}</Select.Item>
							{/each}
						</Select.Content>
					</Select.Root>
				</Label>
			</fieldset>
		</Card.Content>
		<Card.Footer class ="footer">
			<div class="button">
				<Button type="submit">Save</Button>
			</div>
		</Card.Footer>
	</Card.Root>
</form>

<style>
	.data-form{
		display: flex;
		justify-content: center;
		font-family: "Space Mono", serif;
	}
	span{
		font-weight: bold;
	}
</style>
