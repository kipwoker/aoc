import "$lib/scripts/extensions/string"
import "$lib/scripts/extensions/array"
import "$lib/scripts/extensions/set"
import "$lib/scripts/extensions/map"
import type { ISolution } from "../solution"


export class Day05 implements ISolution {
    vowels = 'aeiou'.split('').toSet()
    restricted = [ 'ab', 'cd', 'pq', 'xy' ].toSet()

    rule1 = (input: string[]): boolean => {
        return input.filter(c => this.vowels.has(c)).length >= 3
    }

    rule2 = (input: string[]): boolean => {
        for (let i = 0; i < input.length - 1; ++i) {
            if (input[i] == input[i + 1]) {
                return true
            }
        }

        return false
    }

    rule3 = (input: string[]): boolean => {
        for (let i = 0; i < input.length - 1; ++i) {
            const pair = input[i] + input[i + 1]
            if (this.restricted.has(pair)) {
                return false
            }
        }

        return true
    }

    isNice1 = (input: string[]): boolean => {
        if (!this.rule3(input)) {
            return false
        }

        return this.rule1(input) && this.rule2(input)
    }

    hasNotNear(indexes: number[]): boolean {
        for (let i = 0; i < indexes.length - 1; ++i) {
            for (let j = i + 1; j < indexes.length; ++j) {
                if (Math.abs(indexes[i] - indexes[j]) > 1) {
                    return true
                }
            }
        }

        return false
    }

    test = (groups: Map<string, number[]>) => {
        const key = 'key'
        if (!groups.has(key)) {
            groups.set(key, [])
        }
        groups.get(key)?.push(3)
        return groups
    }

    rule4 = (input: string[]): boolean => {
        const pairs = []
        for (let i = 0; i < input.length - 1; ++i) {
            const pair = input[i] + input[i + 1]
            pairs.push({pair, index: i})
        }

        const groups = pairs.groupBy(x => x.pair, x => x.index)
        return groups.toArray().count(x => x[1].length >= 2 && this.hasNotNear(x[1])) > 0
    }

    rule5 = (input: string[]): boolean => {
        for (let i = 0; i < input.length - 2; ++i) {
            if (input[i] == input[i + 2]) {
                return true
            }
        }

        return false
    }

    isNice2 = (input: string[]): boolean => {
        return this.rule4(input) && this.rule5(input)
    }

    solve1 = (input: string): string => {
        const result = input.getLines().count(line => this.isNice1(line.split('')))
        return result.toString()
    }

    solve2 = (input: string): string => {
        const result = input.getLines().count(line => this.isNice2(line.split('')))
        return result.toString()
    }
}