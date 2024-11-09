<script lang="ts">
	import UserForm from '@/components/UserForm.svelte';
	import type { LayoutData } from './$types';

	let { data }: { data: LayoutData } = $props();
	const { user } = data;
</script>

<h1>Testisivu</h1>

<UserForm />
