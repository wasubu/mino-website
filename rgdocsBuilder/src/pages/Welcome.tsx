const RetroGadgetTutorials: React.FC = () => {
    const mainBreakPoints = [
        "@4xl:bg-green-100",
        "@6xl:bg-green-200",
        "@8xl:bg-green-300",
    ]
    const moduleResponse = "grid gap-2 @5xl:grid-cols-[repeat(4,1fr)] @2xl:grid-cols-[repeat(4,1fr)] grid-cols-[repeat(2,1fr)] justify-center items-center"
    const containerOfModules = `mt-1 bg-gray-100 shadow-sm p-4 rounded-md w-full h-auto ${moduleResponse}`
    const moduleStyle = "bg-gray-200 h-[165px] rounded-md"
    const moduleContainer = "rounded-md overflow-hidden p-0 h-full w-full flex flex-col items-center justify-center"
    const moduleArtContainer = "flex-8 w-full"
    const moduleTextContainer = "flex-2 w-full flex justify-center items-center"

    return (
        <div className="flex flex-col">
            <h2 className="text-2xl font-bold">Welcome to Retro Gadgets Docs!</h2>
            <h1>sorry this site is still under construction</h1>
            <h1>but meanwhile watch this site grow as I add/build things in this website</h1>
            <div className={containerOfModules}>
                <div className={moduleStyle}>
                    <div className={moduleContainer}>
                        <div className={moduleArtContainer}>
                        </div>
                        <div className={moduleTextContainer}>
                            <h1 className="">Screen</h1>
                        </div>
                    </div>
                </div>
                <RGModule text="slider">

                </RGModule>
                <RGModule text="Hello">
                    <div className="bg-amber-400 h-full w-full"></div>
                </RGModule>
                <div className={moduleStyle}>4</div>
                <div className={moduleStyle}>5</div>
                <div className={moduleStyle}>6</div>
                <div className={moduleStyle}>7</div>
                <div className={moduleStyle}>8</div>
                <div className={moduleStyle}>9</div>
                <div className={moduleStyle}>10</div>
                <div className={moduleStyle}>11</div>
                <div className={moduleStyle}>12</div>
                <div className={moduleStyle}>13</div>
            </div>
            <h1>but meanwhile watch this site grow as I add/build things in this website</h1>
        </div>
    )
}

function RGModule({ text, children }: { text: string; children?: React.ReactNode }) {
    const moduleStyle = "bg-gray-200 h-[165px] rounded-md"
    const moduleContainer = (
        "rounded-md overflow-hidden p-0 h-full w-full flex flex-col items-center justify-center"
    )
    const moduleArtContainer = "flex-8 w-full"
    const moduleTextContainer = "flex-2 w-full flex justify-center items-center"
    return (
        <div>
            <div className={moduleStyle}>
                <div className={moduleContainer}>
                    <div className={moduleArtContainer}>
                        {children}
                    </div>
                    <div className={moduleTextContainer}>
                        <h1 className="">{text}</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RetroGadgetTutorials;
