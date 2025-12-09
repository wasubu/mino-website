import { useCallback, useEffect, useRef, useState } from "react"
import sliderHeadImg from "../../assets/sliderHead.png"
import sliderBodyImg from "../../assets/sliderBody.png"

//RGSlider.tsx - Interactive module for RetroGadget's Slider module
const RGSlider: React.FC<{ className?: string, value: number, onChange: (v: number) => void }> = ({ className, onChange, value }) => {
    const moduleScale = 4
    const sliderBodyWidth = 62 * moduleScale
    const sliderHeadWidth = 23 * moduleScale
    const headOffsetY = (14 * moduleScale - 12 * moduleScale) / 2

    const sliderStyle = `${className} relative`
    const overflow = moduleScale

    const [dragging, setDragging] = useState(false)
    const [grabOffset, setGrabOffset] = useState(0)
    const sliderRef = useRef<HTMLDivElement>(null);

    const clamp = (n: number, min: number, max: number) =>
        Math.max(min, Math.min(max, n))

    const onDrag = useCallback(
        (e: MouseEvent) => {
            if (!dragging) return
            const slider = sliderRef.current
            if (!slider) return

            const rect = slider.getBoundingClientRect()
            const x = clamp(
                e.clientX - rect.left - overflow - grabOffset,
                0,
                sliderBodyWidth - sliderHeadWidth + overflow * 2
            )
            onChange(x)
        },
        [dragging, grabOffset, sliderBodyWidth, sliderHeadWidth]
    )

    useEffect(() => {
        function stopDrag() {
            setDragging(false)
        }

        if (dragging) {
            window.addEventListener("mousemove", onDrag)
            window.addEventListener("mouseup", stopDrag)
        }
        return () => {
            window.removeEventListener("mousemove", onDrag)
            window.removeEventListener("mouseup", stopDrag)
        }
    }, [dragging, onDrag])

    return (
        <div
            ref={sliderRef}
            className={sliderStyle}
            style={{
                width: sliderBodyWidth + overflow * 2,
                paddingLeft: overflow
            }}
        >
            <img
                src={sliderBodyImg}
                draggable={false}
                style={{ imageRendering: "pixelated", height: 14 * moduleScale }}
                className="shadow-lg"
            />

            <img
                src={sliderHeadImg}
                className="absolute"
                draggable={false}
                style={{
                    imageRendering: "pixelated",
                    height: 12 * moduleScale,
                    left: value,
                    top: headOffsetY
                }}
                onMouseDown={(e) => {
                    setDragging(true)

                    const rect = e.currentTarget.getBoundingClientRect()
                    setGrabOffset(e.clientX - rect.left)
                }}
            />
            <h1>{Math.round(value)}</h1>
        </div>
    )
}

export default RGSlider