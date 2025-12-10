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
    const [isOn, setIsOn] = useState(true)

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
        setIsOn(prev => !prev)

        const handleMouseUp = () => {
            setPressed(false)
            window.removeEventListener("mouseup", handleMouseUp)
        }
        window.addEventListener("mouseup", handleMouseUp)
    }

    const mainStyle = (`${className}
        relative`
    )

    return (
        <div className={mainStyle} style={{
            width: 16 * MODULE_SCALE,
            filter: "drop-shadow(3px 4px 7px rgba(0,0,0,0.1))",
        }}>
            <img
                src={PowerButtonBodyImg}
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
                style={{
                    imageRendering: "pixelated", height: 19 * MODULE_SCALE,
                }}
                className="select-none"
            />
            <img
                src={pressed ? PowerButtonPressedImg : PowerButtonNormalImg}
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
                style={{ imageRendering: "pixelated", height: 19 * MODULE_SCALE }}
                className="absolute top-0 left-0 select-none"
            />
            <img // I keep this cause it has shadow
                src={pressed ? PowerButtonMarkPressed : PowerButtonMarkNormal}
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
                style={{ imageRendering: "pixelated", height: 19 * MODULE_SCALE }}
                className="absolute top-0 left-0 select-none"
            />
            <div
                className="absolute top-0 mask-no-repeat mask-contain mask-center "
                style={{
                    backgroundColor: isOn
                        ? `rgba(65, 254, 40, ${pressed ? "0" : "0.8"})` // green
                        : `rgba(220, 58, 58, ${pressed ? "0" : "0.8"})`, // red
                    width: 19 * MODULE_SCALE,
                    height: 19 * MODULE_SCALE,
                    WebkitMaskImage: `url(${PowerButtonMarkNormal})`,
                    maskImage: `url(${PowerButtonMarkNormal})`,
                    left: -1.5 * MODULE_SCALE,
                    imageRendering: "pixelated",
                }}
            />
            <div
                className="absolute top-0 mask-no-repeat mask-contain mask-center "
                style={{
                    backgroundColor: isOn
                        ? `rgba(35, 234, 20, ${pressed ? "0.8" : "0"})` // green
                        : `rgba(200, 48, 48, ${pressed ? "0.8" : "0"})`, // red
                    width: 19 * MODULE_SCALE,
                    height: 19 * MODULE_SCALE,
                    WebkitMaskImage: `url(${PowerButtonMarkPressed})`,
                    maskImage: `url(${PowerButtonMarkPressed})`,
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