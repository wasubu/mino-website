import { useEffect, useRef } from "react"
import ScreenMain64by36 from "../../assets/screenMain64by32.png"
import ScreenFrame64by36 from "../../assets/screenFrame64by32.png"

const RGScreen: React.FC<{
    className?: string
    draw?: (vid: CanvasRenderingContext2D, t: number) => void
}> = ({ className, draw = () => { } }) => {
    const moduleScale = 7
    const mainStyle = (`${className}
        relative`
    )
    return (
        <div className={mainStyle} style={{ width: 69 * moduleScale }}>
            <img
                src={ScreenMain64by36}
                draggable={false}
                style={{ imageRendering: "pixelated", height: 42 * moduleScale }}
                className="shadow-lg"
            />
            <DrawCanvas scale={moduleScale} draw={draw}></DrawCanvas>
            <img
                src={ScreenFrame64by36}
                draggable={false}
                style={{
                    imageRendering: "pixelated", height: 38 * moduleScale,
                    top: 2 * moduleScale
                }}
                className="absolute"
            />
        </div>
    )
}

function DrawCanvas({ scale, draw }: { scale: number; draw: (vid: CanvasRenderingContext2D, t: number) => void, runOnce?: () => void }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const vid = canvas.getContext("2d");
        if (!vid) return;

        // Base resolution
        canvas.width = 64;
        canvas.height = 36;

        // Physical scaled CSS size
        canvas.style.width = `${64 * scale}px`;
        canvas.style.height = `${36 * scale}px`;

        vid.imageSmoothingEnabled = false;

        let t = 0;
        let frameId: number;

        const loop = () => {
            t += 0.01;
            draw(vid, t)
            frameId = requestAnimationFrame(loop);
        };

        loop();
        return () => cancelAnimationFrame(frameId);
    }, [scale]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute"
            style={{
                top: 3 * scale,
                left: 2 * scale,
                transform: "scale(1.003)",
                imageRendering: "pixelated",
            }}
        ></canvas>
    );
}

function drawPixelRect(ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number
) {
    const sx = Math.round(x);
    const sy = Math.round(y);
    const sw = Math.round(w);
    const sh = Math.round(h);

    ctx.fillRect(sx, sy, sw, sh);
}

function drawSetPixel(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    color: string,
    alpha?: number
) {
    const px = Math.round(x);
    const py = Math.round(y);

    const oldAlpha = ctx.globalAlpha;

    if (typeof alpha === "number") {
        ctx.globalAlpha = alpha; // 0.0–1.0
    }

    ctx.fillStyle = color;
    ctx.fillRect(px, py, 1, 1);

    ctx.globalAlpha = oldAlpha;
}

function drawLine(
    ctx: CanvasRenderingContext2D,
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    color: string
) {
    ctx.fillStyle = color;

    let dx = Math.abs(x1 - x0);
    let sx = x0 < x1 ? 1 : -1;
    let dy = -Math.abs(y1 - y0);
    let sy = y0 < y1 ? 1 : -1;
    let error = dx + dy;

    while (true) {
        ctx.fillRect(x0, y0, 1, 1);

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

export default RGScreen