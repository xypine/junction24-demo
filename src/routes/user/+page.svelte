<script lang="ts">
	import UserForm from '@/components/UserForm.svelte';
	import type { LayoutData } from './$types';
	let { data }: { data: LayoutData } = $props();
</script>

<UserForm existing={data.user} />
