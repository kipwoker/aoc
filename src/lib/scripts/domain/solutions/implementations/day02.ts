import "$lib/scripts/extensions/string"
import type { ISolution } from "../solution"

interface Sizes {
    l: number
    w: number
    h: number
}

export class Day02 implements ISolution {
    parse = (input: string): Sizes[] => {
        const lines = input.getLines()
        return lines
            .map(line => line.split('x'))
            .map(x => {
                return {l: x[0].toNumber(), w: x[1].toNumber(), h: x[2].toNumber()} as Sizes
            })
    }

    solve1 = (input: string): string => {
        const result = this.parse(input)
            .sumOf(x => {
                const a = x.l * x.w
                const b = x.w * x.h
                const c = x.h * x.l
                const rest = Math.min(a, b, c)

                return 2 * a + 2 * b + 2 * c + rest
            })

        return result.toString()
    }

    solve2 = (input: string): string => {
        const result = this.parse(input)
            .sumOf(x => {
                const s = x.l * x.w * x.h
                const p = (x.l + x.w + x.h - Math.max(x.l , x.w , x.h)) * 2

                return s + p
            })

        return result.toString()
    }
}