import { MD5 } from "$lib/scripts/extensions/common"
import "$lib/scripts/extensions/string"
import type { ISolution } from "../solution"

export class Day04 implements ISolution {

    solve1 = (input: string): string => {
        for (let i = 0; i < 1000000; ++i) {
            const result = MD5(input + i)
            if (result.startsWith('00000')) {
                return i.toString()
            }
        }

        return '-1'
    }

    solve2 = (input: string): string => {
        for (let i = 1000000; i < 10000000; ++i) {
            const result = MD5(input + i)
            if (result.startsWith('000000')) {
                return i.toString()
            }
        }

        return '-1'
    }
}