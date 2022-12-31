<script lang="ts">
	import "$lib/scripts/extensions/array";
	import type { ISolution } from "$lib/scripts/domain/solutions/solution";
	import { measure } from "$lib/scripts/extensions/timer";
	import type { ISolutionModule } from "$lib/scripts/domain/solutions/main";

    export let solutionModule: ISolutionModule

    const solveFns = [ (s: ISolution) => s.solve1, (s: ISolution) => s.solve2 ]

    let answers = ['<undefined>', '<undefined>']
    let times = [-1, -1]
    let input = ''

    function onInputChange(item: any) { 
        input = item.target.value
    }

    function solve(i: number) {
        const solution = solutionModule.createFn()
        const { value, time } = measure(() => solveFns[i](solution)(input))
        answers[i] = value
        times[i] = time
    }
</script>

<div class="box">
    <textarea on:change={onInputChange} rows="20"></textarea>

    {#each answers as answer, i}
        <div>
            Part {i + 1}: {answer}
        </div>
        <div>
            Elapsed: {times[i]}
        </div>
        <button on:click={() => solve(i)} class="submit-button">
            Run
        </button>
    {/each}
</div>

<style>
</style>