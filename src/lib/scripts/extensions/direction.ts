export enum Direction {
    Up,
    Down,
    Left,
    Right
}

export function parseDirection(value: string): Direction {
    switch (value) {
        case '^': return Direction.Up
        case 'v': return Direction.Down
        case '<': return Direction.Left
        case '>': return Direction.Right
        default: throw Error(`Unexpected ${value}`)
    }
}

export function directionToString(direction: Direction): string {
    switch (direction) {
        case Direction.Up: return '^'
        case Direction.Down: return 'v'
        case Direction.Left: return '<'
        case Direction.Right: return '>'
        default: throw Error(`Unexpected ${direction}`)
    }
}