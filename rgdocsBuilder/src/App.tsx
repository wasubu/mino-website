import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Welcome from "./pages/Welcome";
import Cpu from "./pages/modules/misc/Cpu";
import RealityChip from "./pages/modules/misc/RealityChip";

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
                    <main className="flex-1 p-6 overflow-auto min-h-0">
                        <Routes>
                            <Route path="/" element={<Welcome />} />
                            <Route path="/modules/misc/Cpu" element={<Cpu />} />
                            <Route path="/modules/misc/realitychip" element={<RealityChip />} />
                        </Routes>
                    </main>
                </div>
            </div>
        </Router>
    );
};

export default App;
