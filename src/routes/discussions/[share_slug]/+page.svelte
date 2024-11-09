<script lang="ts">
	import type { PageServerData } from './$types';
	let { data }: { data: PageServerData } = $props();
	const { discussion } = data;
</script>

<h1>{discussion.topic}</h1>
