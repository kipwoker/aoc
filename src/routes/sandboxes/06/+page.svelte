<script lang="ts">
	import GridView from "$lib/scripts/canvas/GridView.svelte";
    import { Day06 } from "$lib/scripts/domain/solutions/implementations/day06";
	import type { Cell, GridEvent, InitGridEvent, ChangeCellEvent } from "$lib/scripts/events/events";

    let events: GridEvent<Cell>[] = []
    let input = `turn on 10,0 through 10,0
turn on 9,1 through 11,1
turn on 9,2 through 11,2
turn on 8,3 through 12,3
turn on 8,4 through 12,4
turn on 7,5 through 13,5
turn on 7,6 through 13,6
turn on 6,7 through 14,7
turn on 6,8 through 14,8
turn on 5,9 through 15,9
turn on 5,10 through 15,10
turn on 4,11 through 16,11
turn on 4,12 through 16,12
turn on 3,13 through 17,13
turn on 3,14 through 17,14
turn on 2,15 through 18,15
turn on 2,16 through 18,16
turn on 9,19 through 11,17
toggle 3,5 through 3,5
toggle 11,8 through 11,8
toggle 7,13 through 7,13
toggle 16,2 through 16,2
toggle 2,7 through 2,7
toggle 3,5 through 3,5
toggle 11,8 through 11,8
toggle 7,13 through 7,13
toggle 18,8 through 18,8
toggle 16,2 through 16,2
toggle 10,19 through 10,0
toggle 10,19 through 10,0`

    function onInputChange(item: any) { 
        input = item.target.value
    }

    function convertToCell(item: boolean): Cell {
        return {
            text: '#',
            color: item ? '#000' : '#ccc'
        }
    }

    function solve() {
        const solution = new Day06(20, 20, true)
        solution.solve1(input)
        events = (solution.events as GridEvent<boolean>[])
            .map(e => {
                switch (e.type) {
                    case 'init-grid': return {type: 'init-grid', cells: e.cells.map(item => convertToCell(item))} as InitGridEvent<Cell>
                    case 'change-cell': return {type: 'change-cell', cell: convertToCell(e.cell), point: e.point} as ChangeCellEvent<Cell>
                }
            })
    }
</script>

<svelte:head>
	<title>Day 06 — Sandbox</title>
</svelte:head>

<div class="box-container">
    <div class="box">
        <div>input</div>
        <textarea class="problem-input" on:change={onInputChange} rows="20" value={input}></textarea>

        <button on:click={solve} class="submit-button">
            Run
        </button>
    </div>
    {#if events.length > 0}
        <div class="box">
            <GridView events={events} scale={20} />
        </div>
    {/if}
</div>

<style>
    .problem-input {
        width: 240px; 
        height: 470px;
    }

    .box-container {
        display: flex;
        gap: 10px;
        flex-direction: row;
        background: var(--color-bg-box);
        padding: 20px;
        border-radius: 5px;
        width: fit-content;
    }
</style>