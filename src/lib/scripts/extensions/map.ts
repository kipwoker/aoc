export {}

declare global {
    interface Map<K, V> {
		toArray(): [K, V][]
	}
}

if (!Map.prototype.toArray) {
    Map.prototype.toArray = function() {
        return Array.from(this.entries())
    }
}


