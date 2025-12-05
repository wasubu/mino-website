import { lazy, Suspense, useEffect, useRef, useState } from "react"
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"

import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import Footer from "./components/Footer"

// Lazy-loaded pages
import Welcome from "./pages/Welcome"
const Experiment = lazy(() => import("./pages/Experiment"))
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
    const mainWinResponse = `${mainBreakPoints.join(" ")} bg-amber-100 duration-300 ${sidebarOpen ? "" : ""}`
    const mainStyle = (
        `@container duration-400 flex-1 pt-6 px-10 overflow-auto min-h-0 
        ${sidebarOpen ? "max-sm:pointer-events-none max-sm:translate-x-10 max-sm:blur-lg" : ""}`
    )

    return (
        <Router basename="/rgdocs">
            <UseOnNavigate onNavigate={() => { setSidebarOpen(false) }}></UseOnNavigate>
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

                    <main className={mainStyle} id="scroll-container">
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
            <ScrollToTop></ScrollToTop>
        </Router >
    );
};

function DocumentRoutes() {
    return (
        <SuspenseOfDocs>
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/introductory" element={<Introductory />} />
                <Route path="/experiment" element={<Experiment />} />
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
        </SuspenseOfDocs>
    )
}

function SuspenseOfDocs({ children }: { children: React.ReactNode }) {
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

function UseOnNavigate({ onNavigate }: { onNavigate?: () => void }) {
    const { pathname } = useLocation();
    const prevPath = useRef<string | null>(null);

    useEffect(() => {
        if (prevPath.current === pathname) return; // only trigger when path changes
        prevPath.current = pathname;

        // Only trigger on small screens (<sm breakpoint)
        if (window.innerWidth < 720) { // Tailwind 'sm' is 640px
            onNavigate?.();
        }
    }, [pathname, onNavigate]);

    return null;
}

function ScrollToTop() {
    const { pathname } = useLocation()
    useEffect(() => {
        const el = document.getElementById("scroll-container");
        if (!el) return
        if (el.scrollTop === 0) return
        const timer = setTimeout(() => {
            el.scrollTo({ top: 0, behavior: "smooth" });
        }, 60);
        return () => clearTimeout(timer);
    }, [pathname]);
    return null
}

export default App;
