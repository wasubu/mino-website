import React, { useRef, useEffect, useCallback, useMemo } from "react"
import sliderHeadImg from "../../assets/sliderHead.png"
import sliderBodyImg from "../../assets/sliderBody.png"

const MODULE_SCALE = 4.5
const BODY_WIDTH = 62 * MODULE_SCALE
const HEAD_WIDTH = 23 * MODULE_SCALE
const OVERFLOW = MODULE_SCALE
const MAX_PIXEL_VALUE = BODY_WIDTH - HEAD_WIDTH + (OVERFLOW * 2)
const HEAD_OFFSET_Y = (14 * MODULE_SCALE - 12 * MODULE_SCALE) / 2

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n))

interface RGSliderProps {
    className?: string
    value: number
    onChange: (v: number) => void
}

const RGSlider: React.FC<RGSliderProps> = React.memo(({ className, onChange, value }) => {
    const sliderRef = useRef<HTMLDivElement>(null)
    const headRef = useRef<HTMLImageElement>(null)
    const textRef = useRef<HTMLHeadingElement>(null)
    const animationFrameRef = useRef<number>(0)

    const onChangeRef = useRef(onChange)
    useEffect(() => {
        onChangeRef.current = onChange
    }, [onChange])

    const pixelFromValue = useMemo(() => {
        return clamp(value, 0, 100) / 100 * MAX_PIXEL_VALUE
    }, [value]) // Only recalculate when value changes

    const getPixelFromValue = useCallback((v: number) => {
        return (clamp(v, 0, 100) / 100) * MAX_PIXEL_VALUE
    }, [])

    const dragInfo = useRef({
        isDragging: false,
        startX: 0,
        initialLeft: 0,
        trackWidth: MAX_PIXEL_VALUE
    })

    useEffect(() => {
        if (!dragInfo.current.isDragging && headRef.current) {
            // Use requestAnimationFrame for smoother updates
            animationFrameRef.current = requestAnimationFrame(() => {
                if (headRef.current) {
                    headRef.current.style.transform = `translate3d(${pixelFromValue}px, ${HEAD_OFFSET_Y}px, 0)`
                }
            })
        }

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current)
            }
        }
    }, [pixelFromValue]) // Using memoized value

    const handlePointerDown = useCallback((e: React.PointerEvent<HTMLImageElement>) => {
        e.preventDefault()
        e.stopPropagation()
        const slider = sliderRef.current
        const head = headRef.current
        if (!slider || !head) return

        const sliderRect = slider.getBoundingClientRect()
        const headRect = head.getBoundingClientRect()

        dragInfo.current = {
            isDragging: true,
            startX: e.clientX,
            initialLeft: headRect.left - sliderRect.left,
            trackWidth: MAX_PIXEL_VALUE
        }

        e.currentTarget.setPointerCapture(e.pointerId)
    }, [])

    const handlePointerMove = useCallback((e: React.PointerEvent<HTMLImageElement>) => {
        if (!dragInfo.current.isDragging) return

        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current)
        }

        animationFrameRef.current = requestAnimationFrame(() => {
            const { startX, initialLeft, trackWidth } = dragInfo.current

            const delta = e.clientX - startX
            let newPixelPos = clamp(initialLeft + delta, 0, trackWidth)

            if (headRef.current) {
                headRef.current.style.transform = `translate3d(${newPixelPos}px, ${HEAD_OFFSET_Y}px, 0)`
            }

            const newVal = (newPixelPos / trackWidth) * 100

            if (textRef.current) {
                textRef.current.textContent = String(Math.round(newVal))
            }

            onChangeRef.current(newVal)
        })
    }, [])

    const handlePointerUp = useCallback((e: React.PointerEvent<HTMLImageElement>) => {
        dragInfo.current.isDragging = false
        e.currentTarget.releasePointerCapture(e.pointerId)

        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current)
        }
    }, [])

    const containerStyle = useMemo(() => ({
        width: BODY_WIDTH + OVERFLOW * 2,
        paddingLeft: OVERFLOW,
        touchAction: 'none' as const
    }), [])

    const bodyStyle = useMemo(() => ({
        imageRendering: "pixelated" as const,
        height: 14 * MODULE_SCALE
    }), [])

    const headStyle = useMemo(() => ({
        imageRendering: "pixelated" as const,
        height: 12 * MODULE_SCALE,
        transform: `translate3d(${getPixelFromValue(value)}px, ${HEAD_OFFSET_Y}px, 0)`
    }), [value, getPixelFromValue])

    return (
        <div
            ref={sliderRef}
            className={`${className || ''} relative`}
            style={containerStyle}
        >
            <img
                src={sliderBodyImg}
                draggable={false}
                style={bodyStyle}
                className="shadow-lg select-none"
                alt="Slider track"
            />

            <img
                ref={headRef}
                src={sliderHeadImg}
                className="absolute left-0 top-0 cursor-grab active:cursor-grabbing will-change-transform"
                draggable={false}
                style={headStyle}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                alt="Slider handle"
            />

            <h1 ref={textRef} className="select-none">
                {Math.round(value)}
            </h1>
        </div>
    )
})

RGSlider.displayName = 'RGSlider'

export default RGSlider