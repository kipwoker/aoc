<script lang="ts">
	import SolutionView from "$lib/scripts/components/SolutionView.svelte";
	import { solutions } from "$lib/scripts/domain/solutions/main";
    import type { PageData } from './$types';

    export let data: PageData;

    let solutionModule = solutions.toMap(x => x.id, x => x).get(data.solutionId)
</script>

<svelte:head>
	<title>{solutionModule?.title}</title>
</svelte:head>

{#if solutionModule}
    <SolutionView solutionModule={solutionModule} />
{:else}
    <div>Not implemented</div>
{/if}