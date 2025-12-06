
import RGScreen from "../components/RGmodules/RGScreen";
import RGSlider from "../components/RGmodules/RGSlider";

//current file name Experiment.tsx
const Experiment: React.FC = () => {
    const pageStyle = (
        `relative min-h-[calc(100vh-var(--spacing-navY)-15px)] py-5 px-8 shadow-sm
        border-2 rounded-2xl border-gray-200 m-2 flex flex-col`
    )
    return (
        <div className={pageStyle}>
            <h2 className="text-2xl font-bold">Experiment</h2>
            <div className="flex flex-col gap-9">
                <RGSlider className="absolute top-40 left-5"></RGSlider>
                <RGSlider className="absolute top-40 left-5"></RGSlider>
                <RGScreen className="absolute top-40 left-5" ></RGScreen>
            </div>
        </div>
    )
}
export default Experiment;





