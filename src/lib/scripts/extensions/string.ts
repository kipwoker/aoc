export {}

declare global {
    interface String {
		getLines(): string[]
        toNumber(): number
	}
}

if (!String.prototype.getLines) {
    String.prototype.getLines = function() {
        return this.split('\n')
    }
}

if (!String.prototype.toNumber) {
    String.prototype.toNumber = function() {
        return parseInt(this as string, 10)
    }
}