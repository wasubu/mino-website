import { useEffect, useRef } from "react"
import ScreenMain64by36 from "../../assets/screenMain64by32.png"
import ScreenFrame64by36 from "../../assets/screenFrame64by32.png"

const RGScreen: React.FC<{ className?: string }> = ({ className }) => {
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
            <DrawCanvas scale={moduleScale}></DrawCanvas>
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

function DrawCanvas({ scale }: { scale: number }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const offsetFill = 1.003 //added this cause when I fill the screen like red it won't cover up the screen so there would be a black line on the edge

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Base resolution
        canvas.width = 64;
        canvas.height = 36;

        // Physical scaled CSS size
        canvas.style.width = `${64 * scale * offsetFill}px`;
        canvas.style.height = `${36 * scale * offsetFill}px`;

        ctx.imageSmoothingEnabled = false;

        let t = 0;
        let frameId: number;

        const draw = () => {
            t += 0.01;

            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, 64, 36);

            const rawY = Math.sin(t) * 16 + 16;

            ctx.fillStyle = "red";
            drawPixelRect(ctx, 30, rawY, 4, 4);

            drawSetPixel(ctx, 0, 0, "red")

            frameId = requestAnimationFrame(draw);
        };

        draw();
        return () => cancelAnimationFrame(frameId);
    }, [scale]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute -translate-x-px"
            style={{
                top: 3 * scale,
                left: 2 * scale,
                imageRendering: "pixelated",
            }}
        ></canvas>
    );
}

function drawPixelRect(
    ctx: CanvasRenderingContext2D,
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
    color: string
) {
    const px = Math.round(x);
    const py = Math.round(y);

    ctx.fillStyle = color;
    ctx.fillRect(px, py, 1, 1);
}

export default RGScreen