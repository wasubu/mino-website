import { useCallback, useEffect, useState } from "react"
import sliderHeadImg from "../../assets/sliderHead.png"
import sliderBodyImg from "../../assets/sliderBody.png"

const RGSlider: React.FC<{ className?: string }> = ({ className }) => {
    const moduleScale = 4
    const sliderBodyWidth = 62 * moduleScale
    const sliderHeadWidth = 23 * moduleScale
    const headOffsetY = (14 * moduleScale - 12 * moduleScale) / 2

    const sliderStyle = `${className} relative`
    const overflow = moduleScale

    const [value, setValue] = useState(0)
    const [dragging, setDragging] = useState(false)
    const [grabOffset, setGrabOffset] = useState(0)

    const clamp = (n: number, min: number, max: number) =>
        Math.max(min, Math.min(max, n))

    const onDrag = useCallback(
        (e: MouseEvent) => {
            if (!dragging) return
            const slider = document.getElementById("rg-slider-area")
            if (!slider) return

            const rect = slider.getBoundingClientRect()
            const x = clamp(
                e.clientX - rect.left - overflow - grabOffset,
                0,
                sliderBodyWidth - sliderHeadWidth + overflow * 2
            )
            setValue(x)
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
            id="rg-slider-area"
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
        </div>
    )
}

export default RGSlider