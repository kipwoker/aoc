import { Day01 } from "./implementations/day01";
import { Day02 } from "./implementations/day02";
import { Day03 } from "./implementations/day03";
import { Day04 } from "./implementations/day04";
import { Day05 } from "./implementations/day05";
import { Day06 } from "./implementations/day06";
import { Day07 } from "./implementations/day07";
import type { ISolution } from "./solution";

export type SolutionFactory = () => ISolution

const solutionFactories: SolutionFactory[] = [
    () => new Day01(),
    () => new Day02(),
    () => new Day03(),
    () => new Day04(),
    () => new Day05(),
    () => new Day06(1000, 1000, false),
    () => new Day07(),
]

const getTitle = (index: number): string => {
    return `Day ${getId(index)}`
}

const getId = (index: number): string => {
    const day = index + 1
    return day >= 10 ? day.toString() : `0${day}`
}

export interface ISolutionModule {
    id: string
    title: string
    createFn: SolutionFactory
}

export const solutions: ISolutionModule[] = solutionFactories
    .map((createFn, index) => ({
        id: getId(index),
        title: getTitle(index), 
        createFn
    }))