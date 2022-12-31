export {}

declare global {
    interface Set<T> {
        toArray(): T[]
        intersect(other: Set<T>): Set<T>
	}
}

if (!Set.prototype.toArray) {
    Set.prototype.toArray = function() {
        return Array.from(this)
    }
}

if (!Set.prototype.intersect) {
    Set.prototype.intersect = function(other) {
        const result = new Set()
        this.forEach(item => other.has(item) && result.add(item));
        return result
    }
}