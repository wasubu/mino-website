import { useEffect, useState } from "react"

//Welcome.tsx - the main page when you open the docs:w

const RetroGadgetTutorials: React.FC = () => {
    const moduleResponse = "grid gap-2 @5xl:grid-cols-[repeat(4,1fr)] @2xl:grid-cols-[repeat(4,1fr)] @lg:grid-cols-[repeat(3,1fr)] grid-cols-[repeat(2,1fr)] justify-center items-center"
    const containerOfModules = `mt-1 bg-gray-100 shadow-sm p-4 rounded-md w-full h-auto ${moduleResponse}`

    return (
        <div className="flex flex-col">
            <h2 className="text-2xl font-bold">Welcome to Retro Gadgets Docs!</h2>
            <h1>sorry this site is still under construction</h1>
            <h1>but meanwhile watch this site grow as I add/build things in this website</h1>
            <div className={containerOfModules}>
                <RGModule text="screen"> </RGModule>
                <RGModule text="slider"> </RGModule>
                <RGModule text="led"> </RGModule>
                <RGModule text="Led Strip"> </RGModule>
                <RGModule text="Speaker"> </RGModule>
                <RGModule text="Analog Guage"> </RGModule>
                <RGModule text="Reality Chip"> </RGModule>
                <RGModule text="Knob"> </RGModule>
                <RGModule text="Analog Stick"> </RGModule>
                <RGModule text="CPU Chip"> </RGModule>
                <RGModule text="Keypad"> </RGModule>
                <RGModule text="Led Button"> </RGModule>
                <RGModule text="Webcam"> </RGModule>
                <RGModule text="Lcd Display"> </RGModule>
                <RGModule text="Led Matrix"> </RGModule>
                <RGModule text="Flash Memory"> </RGModule>
                <RGModule text="Serial"> </RGModule>
                <RGModule text="Power Button"> </RGModule>
                <RGModule text="ROM"> </RGModule>
                <RGModule text="Video Chip"> </RGModule>
                <RGModule text="Keyboard Chip"> </RGModule>
                <RGModule text="DPad"> </RGModule>
                <RGModule text="ScreenButton"> </RGModule>
                <RGModule text="Switch"> </RGModule>
                <RGModule text="Segment Display"> </RGModule>
                <RGModule text="Audio Chip"> </RGModule>
                <RGModule text="Decoration"> </RGModule>
                <RGModule text="Gamepad Chip"> </RGModule>
                <RGModule text="Magnetic Connector"> </RGModule>
                <RGModule text="Security Chip"> </RGModule>
                <RGModule text="Wifi Chip"> </RGModule>
            </div>
            <h1>but meanwhile watch this site grow as I add/build things in this website</h1>
        </div>
    )
}

function RGModule({ text, children }: { text: string; children?: React.ReactNode }) {
    const [hovered, setHovered] = useState(false)

    const moduleStyle = "z-0 relative transition-shadow transition-transform hover:z-50 bg-gray-200 duration-200 hover:shadow-md hover:scale-125 h-[165px] rounded-md"
    const moduleContainer = (
        "cursor-pointer rounded-md overflow-hidden p-0 h-full w-full flex flex-col items-center justify-center"
    )
    const moduleArtContainer = "flex-[7.5] w-full"
    const moduleTextContainer = "flex-[2.5]  w-full flex justify-center items-center"
    return (
        <div>
            <div className={moduleStyle}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}>
                <div className={moduleContainer}>
                    <div className={moduleArtContainer}>
                        {/* {children} */}
                        <RainbowBG animated={hovered}>{children}</RainbowBG>
                    </div>
                    <div className={moduleTextContainer}>
                        <h1 className="">{text}</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

function RainbowBG({ animated, children }: { animated: boolean; children?: React.ReactNode }) {
    const [hue, setHue] = useState(() => Math.floor(Math.random() * 360));

    useEffect(() => {
        if (!animated) return;

        const id = setInterval(() => {
            setHue(h => (h + 1) % 360);
        }, 1);

        return () => clearInterval(id);
    }, [animated]);

    return (
        <div
            className="w-full h-full transition-colors duration-100"
            style={{
                backgroundColor: `hsl(${hue}, 45%, 65%)`,
            }}
        >{children}
        </div>
    );
}



export default RetroGadgetTutorials;
