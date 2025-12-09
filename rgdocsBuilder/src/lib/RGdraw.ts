export default class RGDraw {
    private ctx: CanvasRenderingContext2D
    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx
    }

    rect(
        x: number,
        y: number,
        w: number,
        h: number
    ) {
        const sx = Math.round(x);
        const sy = Math.round(y);
        const sw = Math.round(w);
        const sh = Math.round(h);

        this.ctx.fillRect(sx, sy, sw, sh);
    }

    pixel(
        x: number,
        y: number,
        alpha?: number
    ) {
        const px = Math.round(x);
        const py = Math.round(y);
        const oldAlpha = this.ctx.globalAlpha;
        if (typeof alpha === "number") {
            this.ctx.globalAlpha = alpha; // 0.0–1.0
        }
        this.ctx.fillRect(px, py, 1, 1);

        this.ctx.globalAlpha = oldAlpha;
    }

    line(
        x0: number,
        y0: number,
        x1: number,
        y1: number,
    ) {
        let dx = Math.abs(x1 - x0);
        let sx = x0 < x1 ? 1 : -1;
        let dy = -Math.abs(y1 - y0);
        let sy = y0 < y1 ? 1 : -1;
        let error = dx + dy;

        while (true) {
            this.ctx.fillRect(x0, y0, 1, 1);

            if (x0 === x1 && y0 === y1) break;

            let e2 = 2 * error;

            if (e2 >= dy) {
                error += dy;
                x0 += sx;
            }

            if (e2 <= dx) {
                error += dx;
                y0 += sy;
            }
        }
    }
}