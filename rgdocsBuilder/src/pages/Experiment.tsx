
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
                    }></RGScreen>
                <h1 className="top-40 -translate-x-5">{slider1}</h1>
            </div>
        </div>
    )
}

let posX = 0;
let posY = 0;
let velX = 0.2;
let velY = 0.15;
let hue = 0;

const myWaveDraw = (vid: CanvasRenderingContext2D, t: number, speedSlider: number, hueSlider: number) => {
    // Update hue
    hue = hueSlider * 2.2012
    if (hue > 360) hue -= 360;
    vid.fillStyle = `black`;
    vid.fillRect(0, 0, 64, 36);

    // Apply speed slider as a multiplier to velocity
    const speedFactor = 0.05 + speedSlider / 100;
    let currentVelX = velX > 0 ? speedFactor : -speedFactor;
    let currentVelY = velY > 0 ? speedFactor : -speedFactor;

    // Move square
    posX += currentVelX;
    posY += currentVelY;

    // Bounce off edges and update persistent velocity
    if (posX < 0) { posX = 0; velX = speedFactor; }
    if (posX > 64 - 6) { posX = 64 - 6; velX = -speedFactor; }
    if (posY < 0) { posY = 0; velY = speedFactor; }
    if (posY > 36 - 6) { posY = 36 - 6; velY = -speedFactor; }

    // Draw square
    vid.fillStyle = `hsl(${hue}, 80%, 50%)`;
    vid.fillRect(Math.floor(posX), Math.floor(posY), 6, 6);
};



export default Experiment;