<script lang="ts">
	import UserForm from '@/components/UserForm.svelte';
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	let { data, children }: { data: LayoutData, children: Snippet } = $props();
</script>

{JSON.stringify(data)}

<UserForm existing={data.user} />
