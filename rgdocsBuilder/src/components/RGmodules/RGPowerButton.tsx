import { useEffect, useState } from "react"
import PowerButtonBodyImg from "../../assets/powerButton body.png"
import PowerButtonNormalImg from "../../assets/powerButton normal.png"
import PowerButtonPressedImg from "../../assets/powerButton pressed.png"
import PowerButtonMarkNormal from "../../assets/powerButton mark normal.png"
import PowerButtonMarkPressed from "../../assets/powerButton mark pressed.png"

const MODULE_SCALE = 4.5

//DUMMY.tsx - a boilerplate for creating interactive modules
const RGPowerButton: React.FC<{ className?: string }> = ({ className }) => {
    const [pressed, setPressed] = useState(false)
    // const [isOn, setIsOn] = useState(false)

    useEffect(() => {
        const images = [
            PowerButtonMarkNormal,
            PowerButtonMarkPressed
        ]
        images.forEach(src => {
            const img = new Image()
            img.src = src
        })
    }, [])

    const handleMouseDown = () => {
        setPressed(true)

        const handleMouseUp = () => {
            setPressed(false)
            window.removeEventListener("mouseup", handleMouseUp)
        }
        window.addEventListener("mouseup", handleMouseUp)
    }

    const mainStyle = (`${className}
        bg-amber-500 relative`
    )
    return (
        <div className={mainStyle} style={{ width: 16 * MODULE_SCALE }}>
            <img
                src={PowerButtonBodyImg}
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
                style={{ imageRendering: "pixelated", height: 19 * MODULE_SCALE }}
                className="select-none"
            />
            <img
                src={pressed ? PowerButtonPressedImg : PowerButtonNormalImg}
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
                style={{ imageRendering: "pixelated", height: 19 * MODULE_SCALE }}
                className="absolute top-0 left-0 select-none"
            />
            <img
                src={pressed ? PowerButtonMarkPressed : PowerButtonMarkNormal}
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
                style={{ imageRendering: "pixelated", height: 19 * MODULE_SCALE }}
                className="absolute top-0 left-0 select-none"
            />
            <div
                className=" absolute top-0 mask-no-repeat mask-contain mask-center "
                style={{
                    backgroundColor: "rgba(220, 38, 38, 0.8)",
                    width: 19 * MODULE_SCALE,
                    height: 19 * MODULE_SCALE,
                    WebkitMaskImage: `url(${pressed ? PowerButtonMarkPressed : PowerButtonMarkNormal
                        })`,
                    maskImage: `url(${pressed ? PowerButtonMarkPressed : PowerButtonMarkNormal
                        })`,
                    left: -1.5 * MODULE_SCALE,
                    imageRendering: "pixelated",
                }}
            />
            <div
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
                style={{
                    imageRendering: "pixelated",
                    height: 13 * MODULE_SCALE,
                    width: 14 * MODULE_SCALE,
                    top: MODULE_SCALE * 6,
                    left: MODULE_SCALE,
                }}
                onMouseDown={handleMouseDown}
                className="absolute cursor-pointer"
            >
            </div>
        </div>
    )
}

export default RGPowerButton