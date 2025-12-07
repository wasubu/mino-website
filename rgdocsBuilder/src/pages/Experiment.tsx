
import { useState } from "react";
import RGScreen from "../components/RGmodules/RGScreen";
import RGSlider from "../components/RGmodules/RGSlider";

//current file name Experiment.tsx
const Experiment: React.FC = () => {
    const [slider1, setSlider1] = useState(0)
    const [slider2, setSlider2] = useState(0)
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
                <RGScreen className="absolute top-40 left-5" draw={(vid, t) => myWaveDraw(vid, t, slider1, slider2)} ></RGScreen>
                <h1 className="top-40 -translate-x-5">{slider1}</h1>
            </div>
        </div>
    )
}

const myWaveDraw = (vid: CanvasRenderingContext2D, t: number, slider1: number, slider2: number) => {
    // Clear screen
    vid.fillStyle = "rgb(0,0,0)";
    vid.fillRect(slider1, slider2, 64, 36);

    // --- Square movement math ---
    // Square will bounce/wander around the screen
    const speedX = Math.sin(t * 8) * 0.5 + 0.5; // normalized 0→1
    const speedY = Math.cos(t * 6) * 0.5 + 0.5; // normalized 0→1

    const x = speedX * (64 - 6); // 6px square width
    const y = speedY * (37 - 6); // 6px square height

    // --- Draw square ---
    vid.fillStyle = "rgb(255, 40, 40)";
    vid.fillRect(Math.floor(x), Math.floor(y), 6, 6);
};


export default Experiment;