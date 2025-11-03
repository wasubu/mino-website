import { NavLink } from "react-router-dom";

const Sidebar: React.FC = () => {
    const linkClassCommon = "block px-4 py-2 rounded hover:bg-blue-100 "
    const linkClass = ({ isActive }: { isActive: boolean }) =>
        `${linkClassCommon} ${isActive ? "bg-gray-200 font-semibold" : ""}`;
    const linkClassBold = ({ isActive }: { isActive: boolean }) =>
        `${linkClassCommon} font-semibold ${isActive ? "bg-gray-200" : ""}`;

    return (
        <nav className="w-64 bg-gray-100  p-4 overflow-auto min-h-0">
            <h1 className="text-5xl mb-5">OOpps hello</h1>
            <ul className="space-y-1">
                <NavLink to="/" className={linkClassBold}>
                    Welcome!
                </NavLink>
                <li className="space-y-1">
                    <NavLink to="/modules" className={linkClassBold} end>
                        Modules
                    </NavLink>
                    <ul className="ml-4 space-y-1">
                        <li>
                            <NavLink to="/modules/misc/cpu" className={linkClass}>
                                CPU
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/modules/misc/realitychip" className={linkClass}>
                                Reality Chip
                            </NavLink>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav >
    );
};

export default Sidebar;
