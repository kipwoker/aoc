import { parseDirection, type Direction } from "$lib/scripts/extensions/direction"
import { Point } from "$lib/scripts/extensions/math"
import "$lib/scripts/extensions/string"
import type { ISolution } from "../solution"

export class Day03 implements ISolution {
    parse = (input: string): Direction[] => {
        return input.split('').map(x => parseDirection(x))
    }

    solve1 = (input: string): string => {
        const directions = this.parse(input)
        const visited = new Set<string>()
        let cursor = new Point(0, 0)
        visited.add(cursor.toValue())
        let counter = 1
        for (const direction of directions) {
            cursor = cursor.shift(direction)
            const key = cursor.toValue()
            if (!visited.has(key)) {
                visited.add(key)
                ++counter
            }
        }

        return counter.toString()
    }

    solve2 = (input: string): string => {
        const directions = this.parse(input)
        const visited = new Set<string>()
        const cursors = [new Point(0, 0), new Point(0, 0)]
        cursors.forEach(x => visited.add(x.toValue()))
        let counter = 1
        const batchSize = 2
        for (const batch of directions.chuncked(batchSize)) {
            for (let i = 0; i < batchSize; ++i) {
                cursors[i] = cursors[i].shift(batch[i])
                const key = cursors[i].toValue()
                if (!visited.has(key)) {
                    visited.add(key)
                    ++counter
                }
            }
        }

        return counter.toString()
    }
}