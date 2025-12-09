
import ScreenMain64by32 from "../../assets/screenMain64by32.png"

//DUMMY.tsx - a boilerplate for creating interactive modules
const RGScreen: React.FC<{ className?: string }> = ({ className }) => {
    const moduleScale = 4
    const mainStyle = (`${className}
        bg-amber-500 relative`
    )
    return (
        <div className={mainStyle} style={{ width: 69 * moduleScale }}>
            <img
                src={ScreenMain64by32}
                draggable={false}
                style={{ imageRendering: "pixelated", height: 42 * moduleScale }}
                className="shadow-lg"
            />
        </div>
    )
}

export default RGScreen