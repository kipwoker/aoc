import type { IEvent } from "$lib/scripts/events/events"
import "$lib/scripts/extensions/string"
import type { ISolution } from "../solution"

export class Day07 implements ISolution {
    events: IEvent[]

    constructor() {
        this.events = []
    }

    solve1 = (input: string): string => {
        return '-1'
    }

    solve2 = (input: string): string => {
        return '-1'
    }
}