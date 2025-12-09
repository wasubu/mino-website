import { useEffect, useRef } from "react"
import ScreenMain64by36 from "../../assets/screenMain64by32.png"
import ScreenFrame64by36 from "../../assets/screenFrame64by32.png"

//RGScreen.tsx - Interactive module for RetroGadget's Screen module
const RGScreen: React.FC<{
    className?: string
    draw?: (vid: CanvasRenderingContext2D, t: number) => void
}> = ({ className, draw = () => { } }) => {
    const moduleScale = 5.5
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

export default RGScreen