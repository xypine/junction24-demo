<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="h-screen p-4">
	{@render children()}
</div>
