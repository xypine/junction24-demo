<script lang="ts">
	import UserForm from '@/components/UserForm.svelte';
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	let { data }: { data: LayoutData, children: Snippet } = $props();
</script>

<UserForm existing={data.user} />
