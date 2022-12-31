export {}

declare global {
    interface Array<T> {
		count(predicate: (item: T) => boolean): number
        sumOf(transform: (item: T) => number): number
        chuncked(size: number): T[][]
        toSet(): Set<T>
        groupBy<TKey, TValue>(getKey: (item: T) => TKey, getValue?: (item: T) => TValue): Map<TKey, TValue[]>
        minBy(transform: (item: T) => number): T
        maxBy(transform: (item: T) => number): T
        toMap<TKey, TValue>(getKey: (item: T) => TKey, getValue: (item: T) => TValue): Map<TKey, TValue>
	}
}

if (!Array.prototype.count) {
    Array.prototype.count = function(predicate) {
        let count = 0
        for (const element of this) {
            if (predicate(element)) {
                ++count
            }
        }
        return count
    }
}

if (!Array.prototype.sumOf) {
    Array.prototype.sumOf = function(transform) {
        let result = 0
        for (const element of this) {
            result += transform(element)
        }
        return result
    }
}

if (!Array.prototype.chuncked) {
    Array.prototype.chuncked = function(size) {
        const result = [];
        for (let i = 0; i < this.length; i += size) {
            result.push(this.slice(i, i + size));
        }
        return result;
    }
}

if (!Array.prototype.toSet) {
    Array.prototype.toSet = function() {
        return new Set(this)
    }
}

if (!Array.prototype.groupBy) {
    Array.prototype.groupBy = function(getKey, getValue) {
        return this.reduce(function(groups, item) {
            const key = getKey(item)
            if (!groups.has(key)) {
                groups.set(key, [])
            }
            groups.get(key)?.push(getValue ? getValue(item): item)
            return groups
        }, new Map())
    }
}

if (!Array.prototype.minBy) {
    Array.prototype.minBy = function(transform) {
        if (this.length < 1) {
            throw Error('Need at least one item')
        }

        return this.reduce((acc, c) => Math.min(transform(acc), transform(c)), this[0])
    }
}

if (!Array.prototype.maxBy) {
    Array.prototype.maxBy = function(transform) {
        if (this.length < 1) {
            throw Error('Need at least one item')
        }

        return this.reduce((acc, c) => Math.max(transform(acc), transform(c)), this[0])
    }
}

if (!Array.prototype.toMap) {
    Array.prototype.toMap = function(getKey, getValue) {
        return new Map(this.map(x => [getKey(x), getValue(x)]))
    }
}