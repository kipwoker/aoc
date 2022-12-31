<script lang="ts">
	import type { Cell, GridEvent } from "../events/events";
	import { Point, type Grid } from '../extensions/math';
	import { Drawer, type CanvasSettings, type Rectangle } from './Drawer';

    interface State {
        grid?: Grid<Cell>
        index: number
        phase: 'stop' | 'play' | 'pause'
    }

    export let scale: number
    export let events: GridEvent<Cell>[]

    const id = new Date().getTime()
    const fontSize = Math.round(17 * scale / 20)
    
    let drawer: Drawer | null = null
    let speed: number = 50
    let state: State = {
        index: 0,
        phase: 'stop'
    }

    function initDrawer() {
        if (drawer) {
            return
        }

        const settings: CanvasSettings = {
            scale: scale,
            width: state.grid?.rowsCount ?? 0,
            height: state.grid?.colsCount ?? 0
        }
        drawer = new Drawer(<HTMLCanvasElement>document.getElementById(`grid-canvas-${id}`), settings)
    }

    function convertToRectangle(cell: Cell, point: Point, withBorder: boolean = true): Rectangle {
        return {
            topLeft: point,
            widthHeight: new Point(1, 1),
            backgroundColor: '#fff',
            borderColor: withBorder ? cell.color : 'rgba(255, 255, 255, 0.3)',
            text: {
                color: cell.color,
                value: cell.text,
                font: `Caskaydia ${fontSize}px`
            }
        }
    }

    function draw() {
        if (!state.grid || !drawer) {
            return
        }

        const rectangleGrid = state.grid.map((item, point) => convertToRectangle(item, point))

        drawer.clear()
        for (let x = 0; x < state.grid.rowsCount; ++x) {
            drawer.makeRectangle(convertToRectangle({text: x.toString(), color: '#000'}, new Point(x, -1), false))
        }
        for (let y = 0; y < state.grid.colsCount; ++y) {
            drawer.makeRectangle(convertToRectangle({text: y.toString(), color: '#000'}, new Point(-1, y), false))
        }
        rectangleGrid.items.flatMap(x => x).forEach(r => {
            drawer?.makeRectangle(r)
        })
    }

    function apply(index: number) {
        const event = events[index]
        switch (event.type) {
            case 'init-grid':
                state.grid = event.cells.copy()
                initDrawer()
                draw()
                return
            case 'change-cell':
                state.grid?.set(event.point, event.cell)
                drawer?.makeRectangle(convertToRectangle(event.cell, event.point))
                return
        }
    }

    function loop(index: number) {
        if (state.phase === 'stop') {
            state.index = 0
            return
        }
        if (state.phase === 'pause') {
            return
        }
        if (index >= events.length) {
            state.phase = 'stop'
            state.index = 0
            return
        }

        state.index = index
        apply(index)
        setTimeout(() => loop(index + 1), speed)
    }

    function play() {
        state.phase = 'play'
        loop(state.index)
    }

    function stop() {
        state.phase = 'stop'
    }

    function pause() {
        state.phase = 'pause'
    }
</script>

<div>
    <div>Speed</div>
    <input type="range" bind:value={speed} min=1 max=1000 >
</div>
<div>
    {#if state.phase !== 'play'}
        <button on:click={play} class="submit-button">
            Play simulation
        </button>
    {:else if state.phase === 'play'}
        <button on:click={stop} class="submit-button">
            Stop simulation
        </button>
        <button on:click={pause} class="submit-button">
            Pause simulation
        </button>
    {/if}
</div>
<canvas id="grid-canvas-{id}" />