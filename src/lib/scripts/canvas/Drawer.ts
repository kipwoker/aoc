import type { Point } from "$lib/scripts/extensions/math";

export interface CanvasSettings {
    width: number
    height: number
    scale: number
}

export interface Text {
    font: string
    value: string
    color: string
}

export interface Rectangle {
    topLeft: Point
    widthHeight: Point
    backgroundColor: string
    borderColor: string
    text?: Text
}

export class Drawer {
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    settings: CanvasSettings

    constructor(canvas: HTMLCanvasElement, settings: CanvasSettings){
        this.canvas = canvas
        this.settings = settings

        canvas.width = settings.width * settings.scale + 2 * settings.scale
        canvas.height = settings.height * settings.scale + 2 * settings.scale

        const context = canvas.getContext('2d')
        if (context == null) {
            throw Error('No context')
        }
        this.ctx = context
    }

    clear(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    normalize(value: number): number {
        return this.settings.scale * value
    }

    makeRectangle(rectangle: Rectangle): void {
        this.ctx.fillStyle = rectangle.backgroundColor;
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = rectangle.borderColor;

        const padding = 4

        const x = this.normalize(rectangle.topLeft.x) + this.settings.scale + padding
        const y = this.normalize(rectangle.topLeft.y) + this.settings.scale + padding
        const width = this.normalize(rectangle.widthHeight.x) - padding
        const height = this.normalize(rectangle.widthHeight.y) - padding
        this.ctx.clearRect(x, y, width, height)
        this.ctx.strokeRect(x, y, width, height)

        if (rectangle.text) {
            const text = rectangle.text

            this.ctx.font = text.font
            this.ctx.textAlign = 'center'
            this.ctx.textBaseline = 'middle'
            this.ctx.fillStyle = text.color
            
            this.ctx.fillText(text.value, x + (width / 2), y + (height / 2))
        }
    }
}