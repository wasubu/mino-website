import React, { useEffect, useState } from "react"
import PowerButtonBodyImg from "../../assets/powerButton body.png"
import PowerButtonNormalImg from "../../assets/powerButton normal.png"
import PowerButtonPressedImg from "../../assets/powerButton pressed.png"
import PowerButtonMarkNormalImg from "../../assets/powerButton mark normal.png"
import PowerButtonMarkPressedImg from "../../assets/powerButton mark pressed.png"

import PowerOnSnd from "../../assets/powerbutton on.opus"
import PowerOffSnd from "../../assets/powerbutton off.opus"


const MODULE_SCALE = 3.1

//DUMMY.tsx - a boilerplate for creating interactive modules
const RGPowerButton: React.FC<{
    className?: string
    onToggle?: (state: boolean) => void
}> = ({ className, onToggle }) => {
    const [pressed, setPressed] = useState(false)
    const [isOn, setIsOn] = useState(true)

    const audioOnRef = React.useRef<HTMLAudioElement | null>(null)
    const audioOffRef = React.useRef<HTMLAudioElement | null>(null)

    useEffect(() => {
        audioOnRef.current = new Audio(PowerOnSnd)
        audioOffRef.current = new Audio(PowerOffSnd)
    }, [])

    const handleMouseDown = () => {
        setPressed(true)
        const nextIsOn = !isOn;
        setIsOn(nextIsOn);

        onToggle?.(nextIsOn);

        if (nextIsOn) {
            const audio = audioOnRef.current;
            if (audio) {
                audio.currentTime = 0;
                audio.play().catch(e => console.log(e));
            }
        } else {
            const audio = audioOffRef.current;
            if (audio) {
                audio.currentTime = 0;
                audio.play().catch(e => console.log(e));
            }
        }

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
            {/* <img // I keep this cause it has shadow
                src={pressed ? PowerButtonMarkPressedImg : PowerButtonMarkNormalImg}
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
                style={{ imageRendering: "pixelated", height: 19 * MODULE_SCALE }}
                className="absolute top-0 left-0 select-none"
            /> */}
            <div
                className="absolute top-0 mask-no-repeat mask-contain mask-center "
                style={{
                    backgroundColor: isOn
                        ? `rgba(65, 250, 40, ${pressed ? "0" : "0.8"})` // green
                        : `rgba(220, 58, 58, ${pressed ? "0" : "0.8"})`, // red
                    width: 19 * MODULE_SCALE,
                    height: 19 * MODULE_SCALE,
                    WebkitMaskImage: `url(${PowerButtonMarkNormalImg})`,
                    maskImage: `url(${PowerButtonMarkNormalImg})`,
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
                    WebkitMaskImage: `url(${PowerButtonMarkPressedImg})`,
                    maskImage: `url(${PowerButtonMarkPressedImg})`,
                    left: -1.5 * MODULE_SCALE,
                    imageRendering: "pixelated",
                }}
            />
            <div
                className="absolute top-[61%] left-1/2 pointer-events-none"
                style={{
                    width: 11 * MODULE_SCALE,
                    height: 11 * MODULE_SCALE,
                    transform: "translate(-50%, -50%)",
                    borderRadius: "50%",
                    background: isOn
                        ? "rgba(80, 255, 80, 0.3)"  // green glow
                        : "rgba(255, 60, 60, 0.3)", // red glow
                    filter: "blur(13px)",           // softness of glow
                    mixBlendMode: "screen",         // ⭐ blend option
                    zIndex: 3,
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