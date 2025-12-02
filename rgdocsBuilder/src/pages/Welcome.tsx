const RetroGadgetTutorials: React.FC = () => {
    const mainBreakPoints = [
        "@4xl:bg-green-100",
        "@6xl:bg-green-200",
        "@8xl:bg-green-300",
    ]
    const moduleResponse = "grid gap-2 @5xl:grid-cols-[repeat(4,1fr)] @2xl:grid-cols-[repeat(4,1fr)] grid-cols-[repeat(2,1fr)] justify-center items-center"
    const moduleContainer = `mt-1 bg-gray-100 p-4 rounded-md w-full h-auto ${moduleResponse}`
    const moduleStyle = "bg-gray-200 h-[165px] rounded-md"
    const moduleArtContainer = `flex-8 w-full`
    // shadow-[-4px_-4px_10px_rgba(0,0,0,0.05)] 
    const moduleTextContainer = `flex-2 w-full flex justify-center items-center`

    return (
        <div className="flex flex-col">
            <h2 className="text-2xl font-bold">Welcome to Retro Gadgets Docs!</h2>
            <h1>sorry this site is still under construction</h1>
            <h1>but meanwhile watch this site grow as I add/build things in this website</h1>
            <div className={moduleContainer}>
                <div className={moduleStyle}>
                    <div className="rounded-md overflow-hidden p-0 h-full w-full flex flex-col items-center justify-center">
                        <div className={moduleArtContainer}>
                        </div>
                        <div className={moduleTextContainer}>
                            <h1 className="">CPU Chip</h1>
                        </div>
                    </div>
                </div>
                <div className={moduleStyle}>2</div>
                <div className={moduleStyle}>3</div>
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

export default RetroGadgetTutorials;
