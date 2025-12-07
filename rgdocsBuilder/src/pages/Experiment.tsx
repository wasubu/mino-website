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

    const screen1Vars = useRef<Screen1Vars>({
        posX: 0,
        posY: 0,
        velX: 1,  // Start moving right
        velY: 1,  // Start moving down
        hue: 0
    })

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
                            screen1Loop(vid, t, slider1Ref.current, slider2Ref.current, screen1Vars.current)
                    }></RGScreen>
            </div>
        </div>
    )
}

type Screen1Vars = {
    posX: number;
    posY: number;
    velX: number; // Used to track direction (-1 or 1)
    velY: number; // Used to track direction (-1 or 1)
    hue: number;
}
const screen1Loop = (
    vid: CanvasRenderingContext2D,
    t: number, speedSlider: number,
    hueSlider: number,
    self: Screen1Vars
) => {
    let { posX, posY, velX, velY, hue } = self
    // Update hue
    hue = hueSlider * 2.2012
    if (hue > 360) hue -= 360;
    vid.fillStyle = `black`;
    vid.fillRect(0, 0, 64, 36);

    // Apply speed slider as a multiplier to velocity
    const speedFactor = 0.05 + speedSlider / 50;
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
    Object.assign(self, { posX, posY, velX, velY, hue });
};

export default Experiment;