import type { ChangeCellEvent, IEvent, InitGridEvent } from "$lib/scripts/events/events"
import { create2DArray, Grid, Point } from "$lib/scripts/extensions/math"
import "$lib/scripts/extensions/string"
import "$lib/scripts/extensions/array"
import type { ISolution } from "../solution"

type ActionType = 'turn_on' | 'turn_off' | 'toggle'
interface Action {
    type: ActionType
    from: Point
    to: Point
}

export class Day06 implements ISolution {
    events: IEvent[]
    rowsCount: number
    colsCount: number
    collectEvents: boolean

    constructor(rowsCount: number, colsCount: number, collectEvents: boolean) {
        this.events = []
        this.rowsCount = rowsCount
        this.colsCount = colsCount
        this.collectEvents = collectEvents
    }

    fire = <TEvent extends IEvent>(e: TEvent) : void => {
        this.events.push(e)
    }

    parse = (input: string): Action[] => {
        return input
            .replaceAll('turn on', 'turn_on')
            .replaceAll('turn off', 'turn_off')
            .getLines()
            .map(line => {
                const parts = line.split(' ')
                const [fromX, fromY] = parts[1].split(',')
                const [toX, toY] = parts[3].split(',')
                const from = new Point(fromX.toNumber(), fromY.toNumber())
                const to = new Point(toX.toNumber(), toY.toNumber())
                const type = parts[0] as ActionType
                return {type, from, to }
            })
    }

    solve1 = (input: string): string => {
        const actions = this.parse(input)
        const array = create2DArray(this.rowsCount, this.colsCount, () => false)
        const grid = new Grid(array)
        if (this.collectEvents) {
            this.fire<InitGridEvent<boolean>>({type: 'init-grid', cells: grid.copy()})

            grid.onTransform = (point: Point, _: boolean, actual: boolean) => {
                this.fire<ChangeCellEvent<boolean>>({ type: 'change-cell', cell: actual, point })
            }
        }
        
        const transform = (currentState: boolean, actionType: ActionType): boolean => {
            switch (actionType) {
                case 'toggle': return !currentState
                case 'turn_off': return false
                case 'turn_on': return true
            }
        }

        const finalState = actions.reduce(
            (g, action) => g.change(item => transform(item, action.type), action.from, action.to), 
            grid
        )

        const result = finalState.items.sumOf(row => row.count(item => item))

        return result.toString()
    }

    solve2 = (input: string): string => {
        const actions = this.parse(input)
        const array = create2DArray(this.rowsCount, this.colsCount, () => 0)
        const grid = new Grid(array)
        if (this.collectEvents) {
            this.fire<InitGridEvent<number>>({type: 'init-grid', cells: grid})

            grid.onTransform = (point: Point, _: number, actual: number) => {
                this.fire<ChangeCellEvent<number>>({ type: 'change-cell', cell: actual, point })
            }
        }

        const transform = (currentState: number, actionType: ActionType): number => {
            switch (actionType) {
                case 'toggle': return currentState + 2
                case 'turn_off': return Math.max(0, currentState - 1)
                case 'turn_on': return currentState + 1
            }
        }

        const finalState = actions.reduce(
            (g, action) => g.change(item => transform(item, action.type), action.from, action.to), 
            grid
        )

        const result = finalState.items.sumOf(row => row.sumOf(item => item))

        return result.toString()
    }
}