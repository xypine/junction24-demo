<script lang="ts">
	import type { PageServerData } from './$types';
	let { data }: { data: PageServerData } = $props();
</script>

{#each data.discussions as discussion}
	<a href={`/discussions/${discussion.share_slug}`}>{discussion.topic}</a>
{/each}
