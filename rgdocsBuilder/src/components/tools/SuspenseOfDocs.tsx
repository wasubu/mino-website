import { Suspense } from "react";


const SuspenseOfDocs = ({ children }: { children: React.ReactNode }) => {
    return (
        <Suspense
            fallback={
                <div className="py-2 px-1 flex flex-col gap-y-2 animate-[skeleton_1.3s_infinite_linear]">
                    <div className="w-33 h-7 rounded-2xl  skeleton-box"></div>
                    <div className="w-[80%] h-4 rounded-2xl  skeleton-box"></div>
                    <div className="w-[50%] h-4 rounded-2xl skeleton-box"></div>
                    <div className="w-[66%] h-4 rounded-2xl skeleton-box"></div>
                    <div className="w-[66%] h-4 rounded-2xl"></div>
                    <div className="w-[40%] h-4 rounded-2xl skeleton-box"></div>
                    <div className="w-[30%] h-4 rounded-2xl skeleton-box"></div>
                    <div className="w-[35%] h-4 rounded-2xl skeleton-box"></div>
                    <div className="w-full h-30 rounded-xl skeleton-box"></div>
                </div>
            }
        > {children} </Suspense>
    )
}

export default SuspenseOfDocs