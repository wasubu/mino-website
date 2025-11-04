import { NavLink } from "react-router-dom";
import logo from "../assets/RGdocLogo.webp"

const Sidebar: React.FC = () => {
    const linkClassCommon = "block px-3 py-2 rounded-md "
    const linkClass = ({ isActive }: { isActive: boolean }) =>
        `${linkClassCommon} border-l-2 hover:bg-blue-100 hover:border-blue-300 ${isActive ? "bg-gray-200 font-semibold border-gray-400" : "border-gray-200"}`;
    const linkClassBold = ({ isActive }: { isActive: boolean }) =>
        `${linkClassCommon} font-semibold hover:bg-blue-100 ${isActive ? "bg-gray-200 font-bold" : ""}`;
    const indentedItems = "ml-4 space-y-1"

    return (
        <div className="relative w-64 h-screen overflow-hidden bg-gray-100">
            <div className="absolute top-0 left-0 right-[15px] z-10 flex justify-center bg-gray-100/80 backdrop-blur-sm">
                <img src={logo} alt="logo" className="mt-7 mb-7 w-50 h-fit " />
            </div>
            <nav className="h-full overflow-y-auto py-4 px-4 pt-37">
                <ul className="space-y-1">
                    <NavLink to="/" className={linkClassBold}>
                        Welcome!
                    </NavLink>
                    <li className="space-y-1">
                        <NavLink to="/misc-modules" className={linkClassBold} end>
                            Misc Modules
                        </NavLink>
                        <ul className={indentedItems}>
                            <li>
                                <NavLink to="/cpu" className={linkClass}>
                                    CPU
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/realitychip" className={linkClass}>
                                    Reality Chip
                                </NavLink>
                            </li>
                        </ul>
                    </li>
                    <li className="space-y-1">
                        <NavLink to="/misc-modules" className={linkClassBold} end>
                            Output Modules
                        </NavLink>
                        <ul className="ml-4 space-y-1">
                            <li>
                                <NavLink to="/cpu" className={linkClass}>
                                    Led
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/realitychip" className={linkClass}>
                                    Speaker
                                </NavLink>
                            </li>
                        </ul>
                    </li>
                    <li className="space-y-1">
                        <NavLink to="/misc-modules" className={linkClassBold} end>
                            Input Modules
                        </NavLink>
                        <ul className="ml-4 space-y-1">
                            <li>
                                <NavLink to="/cpu" className={linkClass}>
                                    DPad
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/realitychip" className={linkClass}>
                                    Slider
                                </NavLink>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav >
        </div>
    );
};

export default Sidebar;
