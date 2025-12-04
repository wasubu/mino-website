import { lazy, Suspense, useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import Footer from "./components/Footer"

// Lazy-loaded pages
import Welcome from "./pages/Welcome"
const RetroGadgetTutorials = lazy(() => import("./pages/RetroGadgetTutorials"));

const MiscModules = lazy(() => import("./pages/miscModules/MiscModules"));
const Cpu = lazy(() => import("./pages/miscModules/Cpu"));
const RealityChip = lazy(() => import("./pages/miscModules/RealityChip"));

const OutputModules = lazy(() => import("./pages/outputModules/OutputModules"));
const Led = lazy(() => import("./pages/outputModules/Led"));
const Speaker = lazy(() => import("./pages/outputModules/Speaker"));

const InputModules = lazy(() => import("./pages/inputModules/InputModules"));
const DPad = lazy(() => import("./pages/inputModules/DPad"));
const Slider = lazy(() => import("./pages/inputModules/Slider"));

const Introductory = lazy(() => import("./pages/Introductory"));

const App: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const mainBreakPoints = [
        "@4xl:px-25 @4xl:pt-6",
        "@6xl:px-50 @6xl:pt-8",
        "@8xl:px-80 @8xl:pt-8",
    ]
    const mainWinResponse = `${mainBreakPoints.join(" ")} duration-300 ${sidebarOpen ? "" : ""}`
    const mainStyle = (
        `@container duration-400 flex-1 pt-6 px-10 overflow-auto min-h-0 
        ${sidebarOpen ? "max-sm:pointer-events-none max-sm:translate-x-10 max-sm:blur-lg" : ""}`
    )

    return (
        <Router basename="/rgdocs">
            <div className="flex flex-col h-screen overflow-hidden">
                {/* Show this Navbar when over sm */}
                <Navbar toggleSidebar={() => setSidebarOpen(sidebarOpen => !sidebarOpen)} />
                <div className="fixed top-[46px] sm:hidden z-10 ">
                    <Sidebar isOpen={sidebarOpen} />
                </div>

                {/* Flex container for sidebar + content */}
                <div className="flex flex-1 min-h-0 6xl:px-50">
                    {/* Sidebar scrolls independently */}
                    <div className="max-sm:hidden z-10">
                        <Sidebar isOpen={sidebarOpen} />
                    </div>

                    <main className={mainStyle}>
                        <div className={mainWinResponse}> {/*to make it scroll*/}
                            <div className="min-h-[calc(100vh-120px)]">
                                <DocumentRoutes></DocumentRoutes>
                            </div>
                            <Footer></Footer>
                        </div>
                    </main>
                    <div className={`sm:hidden inset-0 absolute duration-400 ${sidebarOpen ? "max-sm:bg-black/10" : "pointer-events-none"}`}
                        onClick={() => setSidebarOpen(false)}
                    ></div>
                </div>
            </div >
        </Router >
    );
};

function DocumentRoutes() {
    return (
        <Suspense fallback={<div className="p-10 text-gray-400 bg-amber-400">Loading…</div>}>
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/introductory" element={<Introductory />} />
                <Route path="/retro-gadget-tutorials" element={<RetroGadgetTutorials />} />
                <Route path="/misc-modules" element={<MiscModules />} />
                <Route path="/cpu" element={<Cpu />} />
                <Route path="/realitychip" element={<RealityChip />} />
                <Route path="/output-modules" element={<OutputModules />} />
                <Route path="/led" element={<Led />} />
                <Route path="/speaker" element={<Speaker />} />
                <Route path="/input-modules" element={<InputModules />} />
                <Route path="/dpad" element={<DPad />} />
                <Route path="/slider" element={<Slider />} />
            </Routes>
        </Suspense>
    )
}

export default App;
