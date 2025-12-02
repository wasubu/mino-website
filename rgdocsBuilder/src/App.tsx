import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Welcome from "./pages/Welcome";
import RetroGadgetTutorials from "./pages/RetroGadgetTutorials"

import MiscModules from "./pages/miscModules/MiscModules";
import Cpu from "./pages/miscModules/Cpu";
import RealityChip from "./pages/miscModules/RealityChip";

import OutputModules from "./pages/outputModules/OutputModules";
import Led from "./pages/outputModules/Led";
import Speaker from "./pages/outputModules/Speaker";

import InputModules from "./pages/inputModules/InputModules";
import DPad from "./pages/inputModules/DPad";
import Slider from "./pages/inputModules/Slider";
import { useState } from "react";
import Introductory from "./pages/Introductory";

const App: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const mainBreakPoints = [
        "@4xl:px-25 @4xl:py-6",
        "@6xl:px-50 @6xl:py-8",
        "@8xl:px-80 @8xl:py-8",
    ]
    const mainWinResponse = `${mainBreakPoints.join(" ")} duration-300`
    const mainStyle = `@container duration-300 flex-1 py-6 px-10 overflow-auto min-h-0 ${sidebarOpen ? "max-sm:backdrop-brightness-90 max-sm:blur-lg " : ""}`

    return (
        <Router basename="/rgdocs">
            <div className="flex flex-col h-screen overflow-hidden">
                {/* Navbar spans full width */}
                <Navbar toggleSidebar={() => setSidebarOpen(sidebarOpen => !sidebarOpen)} />
                <div className="fixed top-[46px] sm:hidden z-10 ">
                    <Sidebar isOpen={sidebarOpen} />
                </div>

                {/* Flex container for sidebar + content */}
                <div className="flex flex-1 min-h-0 6xl:px-50">
                    {/* Sidebar scrolls independently */}
                    <div className="max-sm:hidden">
                        <Sidebar isOpen={sidebarOpen} />
                    </div>

                    {/* Main content scrolls independently */}
                    <main className={mainStyle}>
                        <div className={mainWinResponse}>
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
                        </div>
                    </main>
                </div>
            </div >
        </Router >
    );
};

export default App;
