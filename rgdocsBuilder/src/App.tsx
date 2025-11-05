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

const App: React.FC = () => {
    return (
        <Router basename="/rgdocs">
            <div className="flex flex-col h-screen overflow-hidden">
                {/* Navbar spans full width */}
                <Navbar />

                {/* Flex container for sidebar + content */}
                <div className="flex flex-1 min-h-0">
                    {/* Sidebar scrolls independently */}
                    <Sidebar />

                    {/* Main content scrolls independently */}
                    <main className="xl:py-12 xl:px-50 flex-1 py-6 px-10 overflow-auto min-h-0">
                        <Routes>
                            <Route path="/" element={<Welcome />} />
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
                    </main>
                </div>
            </div>
        </Router>
    );
};

export default App;
