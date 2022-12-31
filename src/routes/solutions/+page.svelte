<script lang="ts">
	import "$lib/scripts/extensions/array"
	import { solutions } from "$lib/scripts/domain/solutions/main"
</script>

<svelte:head>
	<title>Solutions</title>
</svelte:head>

<div class="box">
    {#each solutions as {id, title}}
        <a href="/solutions/{id}">{title}</a>
    {/each}
</div>