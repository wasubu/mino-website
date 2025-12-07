
import { useEffect, useRef, useState } from "react";
import RGScreen from "../components/RGmodules/RGScreen";
import RGSlider from "../components/RGmodules/RGSlider";

//current file name Experiment.tsx
const Experiment: React.FC = () => {
    const [slider1, setSlider1] = useState(0)
    const [slider2, setSlider2] = useState(0)

    const slider1Ref = useRef(slider1)
    const slider2Ref = useRef(slider2)

    useEffect(() => { slider1Ref.current = slider1 }, [slider1])
    useEffect(() => { slider2Ref.current = slider2 }, [slider2])

    const pageStyle = (
        `relative min-h-[calc(100vh-var(--spacing-navY)-15px)] py-5 px-8 shadow-sm
        border-2 rounded-2xl border-gray-200 m-2 flex flex-col overflow-hidden`
    )
    return (
        <div className={pageStyle}>
            <h2 className="text-2xl font-bold">Experiment</h2>
            <div className="flex flex-col gap-9">
                <RGSlider className="absolute top-40 left-5" value={slider1} onChange={setSlider1}></RGSlider>
                <RGSlider className="absolute top-40 left-5" value={slider2} onChange={setSlider2}></RGSlider>
                <RGScreen className="absolute top-40 left-5"
                    draw={
                        (vid, t) =>
                            myWaveDraw(vid, t, slider1Ref.current, slider2Ref.current)
                    } runOnce={screenInitial}></RGScreen>
                <h1 className="top-40 -translate-x-5">{slider1}</h1>
            </div>
        </div>
    )
}

const screenInitial = () => {
    console.log("hi")
}

const myWaveDraw = (vid: CanvasRenderingContext2D, t: number, slider1: number, slider2: number) => {
    const xSpeed = slider1 / 100
    const ySpeed = slider2 / 100
    vid.fillStyle = `rgb(${slider1},0,${slider2})`;
    vid.fillRect(0, 0, 64, 36);

    // --- Square movement math ---
    // Square will bounce/wander around the screen
    const speedX = Math.sin(t * 8) * 0.5 * xSpeed + 0.5; // normalized 0→1
    const speedY = Math.cos(t * 6) * 0.5 * ySpeed + 0.5; // normalized 0→1

    const x = speedX * (64 - 6); // 6px square width
    const y = speedY * (37 - 6); // 6px square height

    // --- Draw square ---
    vid.fillStyle = "rgb(255, 40, 40)";
    vid.fillRect(Math.floor(x), Math.floor(y), 6, 6);
};


export default Experiment;