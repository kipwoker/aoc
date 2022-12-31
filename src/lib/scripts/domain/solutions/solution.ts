import type { IEvent } from "$lib/scripts/events/events"

export interface ISolution {
    solve1: (input: string) => string
    solve2: (input: string) => string
    events?: IEvent[]
}