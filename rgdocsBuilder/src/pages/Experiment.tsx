//current file name Experiment.tsx
const Experiment: React.FC = () => {
    const pageStyle = (
        `min-h-[calc(100vh-var(--spacing-navY)-15px)] py-5 px-8 shadow-sm
        border-2 rounded-2xl border-gray-200 m-2 flex flex-col`
    )
    return (
        <div className={pageStyle}>
            <h2 className="text-2xl font-bold">Experiment</h2>
        </div>
    )
}
export default Experiment;





