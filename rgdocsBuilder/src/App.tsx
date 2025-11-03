import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Welcome from "./pages/Welcome";
import Cpu from "./pages/modules/misc/Cpu";
import RealityChip from "./pages/modules/misc/RealityChip";
import Modules from "./pages/modules/Modules";

const App: React.FC = () => {
    return (
        <Router basename="/rgdocs">
            <div className="flex flex-col h-screen">
                {/* Navbar spans full width */}
                <Navbar />

                {/* Flex container for sidebar + content */}
                <div className="flex flex-1 min-h-0">
                    {/* Sidebar scrolls independently */}
                    <Sidebar />

                    {/* Main content scrolls independently */}
                    <main className="xl:py-12 xl:px-50 flex-1 py-6 px-8 overflow-auto min-h-0">
                        <Routes>
                            <Route path="/" element={<Welcome />} />
                            <Route path="/modules/misc/cpu" element={<Cpu />} />
                            <Route path="/modules/misc/realitychip" element={<RealityChip />} />
                            <Route path="/modules" element={<Modules />} />
                        </Routes>
                    </main>
                </div>
            </div>
        </Router>
    );
};

export default App;
