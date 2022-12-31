export interface IMeasureResult<T> {
    value: T
    time: number
}

export function measure<T>(fn: () => T): IMeasureResult<T> {
    const start = new Date()
    const value = fn()
    const end = new Date()

    return {value, time: end.getMilliseconds() - start.getMilliseconds()}
}