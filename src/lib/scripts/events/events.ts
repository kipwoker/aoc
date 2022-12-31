import type { Grid, Point } from "../extensions/math"

export interface IEvent {
    type: string
}

export interface Cell {
    text: string
    color: string
}

export type GridEvent<T> = InitGridEvent<T> | ChangeCellEvent<T>

export interface InitGridEvent<T> extends IEvent {
    type: 'init-grid'
    cells: Grid<T>
}

export interface ChangeCellEvent<T> extends IEvent {
    type: 'change-cell'
    cell: T
    point: Point
}