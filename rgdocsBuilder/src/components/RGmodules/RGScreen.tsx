import { useEffect, useRef, type JSX } from "react"
import ScreenMain64by36 from "../../assets/screenMain64by32.png"
import ScreenFrame64by36 from "../../assets/screenFrame64by32.png"

const RGScreen: React.FC<{ className?: string }> = ({ className }) => {
    const moduleScale = 4
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
            <img
                src={ScreenFrame64by36}
                draggable={false}
                style={{
                    imageRendering: "pixelated", height: 38 * moduleScale,
                    top: 2 * moduleScale
                }}
                className="absolute"
            />
            <DrawCanvas scale={moduleScale}></DrawCanvas>
            {/* <FillScreen color="bg-blue-500" scale={moduleScale}></FillScreen>
            <SetPixel x={64} y={0} color="bg-red-500" scale={moduleScale}></SetPixel> */}
        </div>
    )
}

function DrawCanvas({ scale }: { scale: number }) {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const vid = canvas.getContext("2d")
        if (!vid) return
        canvas.width = 64
        canvas.height = 36
        let t = 0
        let frameId: number
        const draw = () => {
            t += 0.03

            vid.fillStyle = "black"
            vid.fillRect(0, 0, 64, 36)

            const x = 30
            const y = Math.sin(t) * 13 + 15

            vid.fillStyle = "red"
            vid.fillRect(x, y, 4, 4)

            frameId = requestAnimationFrame(draw)
        }
        draw()
        return () => cancelAnimationFrame(frameId)
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="absolute"
            style={{
                top: 3 * scale,
                left: 2 * scale,
                width: 64 * scale,
                height: 36 * scale,
                imageRendering: "pixelated"
            }}
        >

        </canvas>
    )
}



// function FillScreen({ scale, color }: { scale: number; color: string }) {
//     const screenXsize = 64
//     const screenYsize = 36
//     const result: JSX.Element[] = []
//     for (let row = 0; row < screenYsize; row++) {
//         for (let col = 0; col < screenXsize; col++) {
//             const index = row * screenXsize + col
//             result.push(
//                 <SetPixel key={index} x={col} y={row} color={color} scale={scale} ></SetPixel>
//             )
//         }
//     }
//     return <>{result}</>
// }

// function SetPixel({ x, y, color, scale }: { x: number; y: number; color: string; scale: number }) {
//     if (y < 0 || y > 35) return null
//     if (x < 0 || x > 63) return null
//     const pixelStyle = `absolute ${color}`
//     return (
//         <div className={pixelStyle} style={{
//             top: (y + 3) * scale, left: (x + 2) * scale, //intentional
//             width: scale, height: scale
//         }}> </div>
//     )
// }

export default RGScreen