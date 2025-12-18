import SpeakerImg from "../../assets/speakerMedium.png"

const MODULE_SCALE = 6.5

//DUMMY.tsx - a boilerplate for creating interactive modules
const RGSpeaker: React.FC<{
    className?: string
}> = ({ className }) => {

    const mainStyle = (`${className}
        relative`
    )

    return (
        <div className={mainStyle} style={{
            width: 32 * MODULE_SCALE,
            filter: "drop-shadow(3px 4px 7px rgba(0,0,0,0.1))",
        }}>
            <img
                src={SpeakerImg}
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
                style={{
                    imageRendering: "pixelated", height: 19 * MODULE_SCALE,
                }}
                className="select-none"
            />
        </div>
    )
}

export default RGSpeaker