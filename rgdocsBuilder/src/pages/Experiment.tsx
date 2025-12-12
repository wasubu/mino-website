import { useEffect, useRef, useState } from "react";
import RGDraw from "../lib/RGdraw";
import RGScreen from "../components/RGmodules/RGScreen";
import RGSlider from "../components/RGmodules/RGSlider";
import RGPowerButton from "../components/RGmodules/RGPowerButton";

//Experiment.tsx - a temporary page for testing things
const Experiment: React.FC = () => {
    const [powerState, setPowerState] = useState(true)
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
        hue: 0,
        hueOffset: Math.random() * 359
    })
    const screen2Vars = useRef<Screen2Vars>({
        posX: 0,
        posY: 0,
        velX: 1,  // Start moving right
        velY: 1,  // Start moving down
        hue: 0
    })
    const screen3Vars = useRef<Screen3Vars>({
    })

    useEffect(() => {
        if (!powerState) {
            screen1Vars.current = {
                posX: 0,
                posY: 0,
                velX: 1,
                velY: 1,
                hue: 0,
                hueOffset: Math.random() * 359,
            };
            screen2Vars.current = {
                posX: 0,
                posY: 0,
                velX: 1,
                velY: 1,
                hue: 0,
            };
            screen3Vars.current = {
            };
        }
    }, [powerState])

    const pageStyle = (
        `relative min-h-[calc(100vh-var(--spacing-navY)-15px+150px)] py-5 px-8 shadow-sm
        border-2 rounded-2xl border-gray-200 m-3 flex flex-col overflow-hidden`
    )

    return (
        <div className={pageStyle}>
            <h2 className="text-2xl font-bold">Experiment</h2>
            <div className="flex flex-col gap-9">
                <RGSlider className="absolute top-20 left-5" value={slider1} onChange={setSlider1}></RGSlider>
                <RGSlider className="absolute top-20 left-5" value={slider2} onChange={setSlider2}></RGSlider>
                <RGScreen className="absolute top-20 left-5"
                    powerState={powerState}
                    draw={
                        (vid, t) =>
                            drawScreen1(vid, t, slider1Ref.current, slider2Ref.current, screen1Vars.current)
                    }></RGScreen>
                <RGScreen className="absolute top-20 left-5"
                    powerState={powerState}
                    draw={
                        (vid, t) =>
                            drawScreen2(vid, t, slider1Ref.current, slider2Ref.current, screen2Vars.current)
                    }></RGScreen>
                <RGScreen className="absolute bottom-75 left-81"
                    draw={
                        (vid, t) => drawScreen3(vid, t) // , screen3Vars.current
                    }
                    powerState={powerState}
                    type="64x64"
                ></RGScreen>
                <RGPowerButton className="absolute bottom-185 left-85" onToggle={(state) => {
                    setPowerState(state)
                    console.log("Button is now:", state ? "ON" : "OFF")
                }}></RGPowerButton>
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
    hueOffset: number;
}
const drawScreen1 = (
    vid: CanvasRenderingContext2D,
    t: number, speedSlider: number,
    hueSlider: number,
    self: Screen1Vars
) => {
    let { posX, posY, velX, velY, hue, hueOffset } = self
    hue = hueSlider * 2.2012
    if (hue > 360) hue -= 360;
    vid.fillStyle = `black`;
    vid.fillRect(0, 0, 64, 36);

    const speedFactor = 0.05 + speedSlider / 50;
    let currentVelX = velX > 0 ? speedFactor : -speedFactor;
    let currentVelY = velY > 0 ? speedFactor : -speedFactor;

    posX += currentVelX;
    posY += currentVelY;

    if (posX < 0) { posX = 0; velX = speedFactor; }
    if (posX > 64 - 6) { posX = 64 - 6; velX = -speedFactor; }
    if (posY < 0) { posY = 0; velY = speedFactor; }
    if (posY > 36 - 6) { posY = 36 - 6; velY = -speedFactor; }

    const amplitude = 18 * hueSlider / 164;
    const frequency = 0.1 * speedSlider / 164 + 0.05;
    const phase = t;
    const centerY = 36 / 2;
    for (let waveI = 0; waveI <= 10; waveI++) {
        vid.fillStyle = `hsl(${hue + 30 * waveI + hueOffset}, 80%, ${50 - 3.8 * waveI}%)`;
        for (let x = 0; x < 64; x++) {
            const y = centerY + Math.cos(x * frequency + phase - 0.25 * waveI) * amplitude;
            vid.fillRect(x, Math.floor(y), 1, 1);
        }
    }
    vid.fillStyle = `hsl(${hue + hueOffset}, 80%, 50%)`;
    // vid.fillRect(posX, posY, 6, 6);
    vid.fillRect(Math.round(posX), Math.round(posY), 6, 6)
    Object.assign(self, { posX, posY, velX, velY, hue, hueOffset });
};

type Screen2Vars = {
    posX: number;
    posY: number;
    velX: number; // Used to track direction (-1 or 1)
    velY: number; // Used to track direction (-1 or 1)
    hue: number;
}
const drawScreen2 = (
    vid: CanvasRenderingContext2D,
    t: number, speedSlider: number,
    hueSlider: number,
    self: Screen2Vars
) => {
    hueSlider = hueSlider * 1.8
    speedSlider = speedSlider * 1.8
    const draw = new RGDraw(vid)
    let { posX, posY, velX, velY, hue } = self
    hue = hueSlider * 2.2012
    if (hue > 360) hue -= 360;
    vid.fillStyle = `black`;
    vid.fillRect(0, 0, 64, 36);
    if (speedSlider === 180) {
        vid.fillStyle = `green`;
        vid.fillRect(0, 0, 64, 36);
    }

    const speedFactor = 0.05 + speedSlider / 50;
    let currentVelX = velX > 0 ? speedFactor : -speedFactor;
    let currentVelY = velY > 0 ? speedFactor : -speedFactor;

    posX += currentVelX;
    posY += currentVelY;

    if (posX < 0) { posX = 0; velX = speedFactor; }
    if (posX > 64 - 6) { posX = 64 - 6; velX = -speedFactor; }
    if (posY < 0) { posY = 0; velY = speedFactor; }
    if (posY > 36 - 6) { posY = 36 - 6; velY = -speedFactor; }

    const amplitude = 18 * hueSlider / 164;
    const frequency = 0.1 * speedSlider / 164 + 0.05;
    const phase = t;
    const centerY = 36 / 2;
    for (let waveI = 0; waveI <= 10; waveI++) {
        vid.fillStyle = `hsl(${hue + 30 * waveI}, 80%, ${50 - 3.8 * waveI}%)`;
        for (let x = 0; x < 64; x++) {
            const y = centerY + Math.sin(x * frequency + phase - 0.25 * waveI) * amplitude;
            draw.rect(x, y, 1, 1);
        }
    }

    vid.fillStyle = `hsl(${hue}, 80%, 50%)`;
    draw.rect(posX, posY, 6, 6)
    Object.assign(self, { posX, posY, velX, velY, hue });
};

type Screen3Vars = {
}
const drawScreen3 = (
    vid: CanvasRenderingContext2D,
    t: number,
    // self: Screen3Vars
) => {
    vid.fillStyle = `black`;
    vid.fillRect(0, 0, 64, 64);
    const paddingX = 35
    const paddingY = 15
    vid.fillStyle = `yellow`;
    vid.fillRect(paddingX, paddingY, 64 - paddingX * 2, 36 - paddingY * 2);
    vid.fillStyle = "white"
    vid.font = "12px monospace"
    vid.fillText(`t = ${Math.round(t * 100) / 100}`, 3, 62, 98)
};

export default Experiment;