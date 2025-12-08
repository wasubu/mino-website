import { useEffect, useRef, useState } from "react";
import RGScreen from "../components/RGmodules/RGScreen";
import RGSlider from "../components/RGmodules/RGSlider";
import Slider from "./inputModules/Slider";

//Experiment.tsx - a temporary page for testing things
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
    vid.fillStyle = `hsl(${hue}, 80%, 50%)`;
    for (let x = 0; x < 64; x++) {
        const y = centerY + Math.sin(x * frequency + phase) * amplitude;
        vid.fillRect(x, Math.floor(y), 1, 1);
    }
    vid.fillStyle = `hsl(${hue + 30}, 80%, 40%)`;
    for (let x = 0; x < 64; x++) {
        const y = centerY + Math.sin(x * frequency + phase - 0.3) * amplitude;
        vid.fillRect(x, Math.floor(y), 1, 1);
    }
    vid.fillStyle = `hsl(${hue + 60}, 80%, 30%)`;
    for (let x = 0; x < 64; x++) {
        const y = centerY + Math.sin(x * frequency + phase - 0.6) * amplitude;
        vid.fillRect(x, Math.floor(y), 1, 1);
    }
    vid.fillStyle = `hsl(${hue + 90}, 80%, 20%)`;
    for (let x = 0; x < 64; x++) {
        const y = centerY + Math.sin(x * frequency + phase - 0.9) * amplitude;
        vid.fillRect(x, Math.floor(y), 1, 1);
    }

    // Draw square
    vid.fillStyle = `hsl(${hue}, 80%, 50%)`;
    vid.fillRect(Math.floor(posX), Math.floor(posY), 6, 6);
    Object.assign(self, { posX, posY, velX, velY, hue });
};

function drawPixelRect(ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number
) {
    const sx = Math.round(x);
    const sy = Math.round(y);
    const sw = Math.round(w);
    const sh = Math.round(h);

    ctx.fillRect(sx, sy, sw, sh);
}

function drawSetPixel(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    color: string,
    alpha?: number
) {
    const px = Math.round(x);
    const py = Math.round(y);

    const oldAlpha = ctx.globalAlpha;

    if (typeof alpha === "number") {
        ctx.globalAlpha = alpha; // 0.0–1.0
    }

    ctx.fillStyle = color;
    ctx.fillRect(px, py, 1, 1);

    ctx.globalAlpha = oldAlpha;
}

function drawLine(
    ctx: CanvasRenderingContext2D,
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    color: string
) {
    ctx.fillStyle = color;

    let dx = Math.abs(x1 - x0);
    let sx = x0 < x1 ? 1 : -1;
    let dy = -Math.abs(y1 - y0);
    let sy = y0 < y1 ? 1 : -1;
    let error = dx + dy;

    while (true) {
        ctx.fillRect(x0, y0, 1, 1);

        if (x0 === x1 && y0 === y1) break;

        let e2 = 2 * error;

        if (e2 >= dy) {
            error += dy;
            x0 += sx;
        }

        if (e2 <= dx) {
            error += dx;
            y0 += sy;
        }
    }
}

export default Experiment;