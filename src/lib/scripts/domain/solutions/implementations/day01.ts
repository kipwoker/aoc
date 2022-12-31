import type { ISolution } from "../solution"
import "$lib/scripts/extensions/array"

export class Day01 implements ISolution {
    solve1 = (input: string): string => {
        const collection = input.split('')
        const result = collection.count(x => x == '(') - collection.count(x => x == ')')
        return result.toString()
    }

    solve2 = (input: string): string => {
        const collection = input.split('')
        let iterator = 0
        let counter = 0
        for (const ch of collection) {
            ++counter
            if (ch === '(') {
                ++iterator
            } else if (ch === ')') {
                --iterator
                if (iterator < 0) {
                    break
                }
            }
        }
        
        return counter.toString()
    }
}