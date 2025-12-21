import { useEffect, useRef } from "react"
import ScreenMain64by36 from "../../assets/screenMain64by32.png"
import ScreenFrame64by36 from "../../assets/screenFrame64by32.png"

import ScreenMain64by64 from "../../assets/screenMain64by64.png"
import ScreenFrame64by64 from "../../assets/screenFrame64by64.png"

import ScreenMain40by40 from "../../assets/screenMain40by40.png"
import ScreenFrame40by40 from "../../assets/screenFrame40by40.png"

type ScreenType = "64x36" | "64x64" | "40x40";

const SCREEN_CONFIG: Record<ScreenType, {
    width: number
    height: number
    bodyImg: string
    frameImg: string
    bodyScaleOffset?: number
    frameYoffset?: number
    frameScaleOffset?: number
}> = {
    "64x36": {
        width: 64, height: 36,
        bodyImg: ScreenMain64by36,
        frameImg: ScreenFrame64by36
    },
    "64x64": {
        width: 64, height: 64,
        bodyImg: ScreenMain64by64,
        frameImg: ScreenFrame64by64
    },
    "40x40": {
        width: 40, height: 40,
        bodyImg: ScreenMain40by40,
        frameImg: ScreenFrame40by40,
        bodyScaleOffset: 7,
        frameYoffset: 0,
        frameScaleOffset: 7
    }
}

type TouchInfo = {
    x: number
    y: number
    state: boolean
}

type ScreenInfo = {
    width: number
    height: number
    touch?: TouchInfo
}

const noopDraw = (
    _vid: CanvasRenderingContext2D,
    _t: number,
    _screen: ScreenInfo
) => { }

//RGScreen.tsx - Interactive module for RetroGadget's Screen module
const RGScreen: React.FC<{
    className?: string
    draw?: (
        vid: CanvasRenderingContext2D,
        t: number,
        screen: ScreenInfo
    ) => void
    powerState?: boolean
    type?: ScreenType
}> = ({ className, draw = noopDraw, powerState = true, type = "64x36" }) => {
    const moduleScale = 3.9
    const mainStyle = (`${className}
       relative shrink-0`
    )

    const {
        width, height, bodyImg, frameImg,
        frameYoffset = 2, bodyScaleOffset = 6,
        frameScaleOffset = 2
    } = SCREEN_CONFIG[type]
    return (
        <div className={mainStyle} style={{
            width: (width + 5) * moduleScale,
            filter: "drop-shadow(3px 4px 7px rgba(0,0,0,0.1))",
        }}>
            <img
                src={bodyImg}
                draggable={false}
                style={{
                    imageRendering: "pixelated",
                    height: (height + bodyScaleOffset) * moduleScale
                }}
            />
            <DrawCanvas powerState={powerState} width={width} height={height} scale={moduleScale} draw={draw}></DrawCanvas>
            <img
                src={frameImg}
                draggable={false}
                style={{
                    imageRendering: "pixelated",
                    height: (height + frameScaleOffset) * moduleScale,
                    top: frameYoffset * moduleScale
                }}
                className="absolute pointer-events-none"
            />
        </div>
    )
}

function DrawCanvas({
    scale, width, height, draw, powerState = false
}: {
    scale: number
    draw: (
        vid: CanvasRenderingContext2D,
        t: number,
        screen: ScreenInfo
    ) => void, runOnce?: () => void
    powerState?: boolean
    width: number
    height: number
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const touchRef = useRef<TouchInfo>({
        x: 0,
        y: 0,
        state: false
    })

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const vid = canvas.getContext("2d");
        if (!vid) return;
        // Base resolution
        canvas.width = width;
        canvas.height = height;

        // Physical scaled CSS size
        canvas.style.width = `${width * scale}px`;
        canvas.style.height = `${height * scale}px`;

        vid.imageSmoothingEnabled = false;

        const getTouchPos = (e: PointerEvent) => {
            const rect = canvas.getBoundingClientRect()
            const IsInside = (
                e.clientX >= rect.left &&
                e.clientX <= rect.right &&
                e.clientY >= rect.top &&
                e.clientY <= rect.bottom
            )
            if (!IsInside) return false
            const x = Math.floor(
                ((e.clientX - rect.left) / rect.width) * width
            ) | 0
            const y = (
                ((e.clientY - rect.top) / rect.height) * height
            )
            touchRef.current.x = Math.max(0, Math.min(width - 1, x))
            touchRef.current.y = Math.max(0, Math.min(height - 1, y))
            return true
        }
        const onPointerDown = (e: PointerEvent) => {
            canvas.setPointerCapture(e.pointerId)
            touchRef.current.state = true
            getTouchPos(e)
        }
        const onPointerMove = (e: PointerEvent) => {
            if (!touchRef.current.state) return
            getTouchPos(e)
        }
        const onPointerUp = (e: PointerEvent) => {
            touchRef.current.state = false
            canvas.releasePointerCapture(e.pointerId)
        }

        canvas.addEventListener("pointerdown", onPointerDown)
        canvas.addEventListener("pointermove", onPointerMove)
        window.addEventListener("pointerup", onPointerUp)

        let t = 0;
        let frameId: number;

        const screenInfo: ScreenInfo = { width, height, touch: touchRef.current }

        let lastTime = performance.now()
        const loop = () => {
            const now = performance.now()
            const dt = (now - lastTime) / 1000
            lastTime = now
            if (!powerState) {
                vid.fillStyle = "black"
                vid.fillRect(0, 0, width, height)
                return
            }
            t += dt;
            draw(vid, t, screenInfo)
            frameId = requestAnimationFrame(loop);
        };

        loop();
        return () => {
            cancelAnimationFrame(frameId)
            canvas.removeEventListener("pointerdown", onPointerDown)
            canvas.removeEventListener("pointermove", onPointerMove)
            window.removeEventListener("pointerup", onPointerUp)
        }
    }, [scale, powerState]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute"
            style={{
                top: 3 * scale,
                left: 2 * scale,
                transform: "scale(1.005)",
                imageRendering: "pixelated",
                touchAction: "none"
            }}
        ></canvas>
    );
}

export default RGScreen