import { Direction } from "./direction"
import { deepCopy } from "./type"

export class Point {
    x: number
    y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    add = (other: Point) => new Point(this.x + other.x, this.y + other.y)

    shift = (direction: Direction) => {
        switch (direction) {
            case Direction.Up: return this.add(new Point(0, -1))
            case Direction.Down: return this.add(new Point(0, 1))
            case Direction.Left: return this.add(new Point(-1, 0))
            case Direction.Right: return this.add(new Point(1, 0))
            default: throw Error(`Unexpected ${direction}`)
        }
    }

    toValue = (): string => `${this.x};${this.y}`

    getMinMax = (other: Point): [minPoint: Point, maxPoint: Point] => {
        const minY = Math.min(this.y, other.y)
        const maxY = Math.max(this.y, other.y)
        const minX = Math.min(this.x, other.x)
        const maxX = Math.max(this.x, other.x)

        return [new Point(minX, minY), new Point(maxX, maxY)]
    }
}

export class Grid<T> {
    items: T[][]
    rowsCount: number
    colsCount: number

    onTransform: (point: Point, prev: T, actual: T) => void = () => {return}

    constructor(items: T[][]) {
        this.items = items
        this.rowsCount = items.length
        this.colsCount = items.length > 0 ? items[0].length : 0
    }

    change = (transform: (item: T) => T, from: Point, to: Point): Grid<T> => {
        const [minPoint, maxPoint] = from.getMinMax(to)

        for (let y = minPoint.y; y <= maxPoint.y; ++y) {
            for (let x = minPoint.x; x <= maxPoint.x; ++x) {
                const current = this.items[y][x]
                const transformed = transform(current)
                this.onTransform(new Point(x, y), current, transformed)
                this.items[y][x] = transformed
            }
        }
        return this
    }

    map = <R> (transform: (item: T, point: Point) => R): Grid<R> => {
        const items = this.items.map((row, y) => row.map((cell, x) => transform(cell, new Point(x, y))))
        return new Grid<R>(items)
    }

    set = (point: Point, value: T): void => {
        const current = this.items[point.y][point.x]
        this.items[point.y][point.x] = value
        this.onTransform(point, current, value)
    }

    copy = (): Grid<T> => {
        return new Grid(deepCopy(this.items))
    }
}

export function create2DArray<T>(rows: number, cols: number, init: (y: number, x: number) => T): T[][]{
    const array = new Array(rows);
    for (let y = 0; y < rows; ++y) {
      array[y] = new Array(cols);
      for (let x = 0; x < cols; ++x) {
        array[y][x] = init(y, x)
      }
    }

    return array
}