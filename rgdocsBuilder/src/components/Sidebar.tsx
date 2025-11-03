import { NavLink } from "react-router-dom";

const Sidebar: React.FC = () => {
    const linkClass = ({ isActive }: { isActive: boolean }) =>
        `block px-4 py-2 rounded hover:bg-blue-100 ${isActive ? "bg-gray-200 font-bold" : ""}`;

    return (
        <nav className="w-64 bg-gray-100 border-r p-4 overflow-auto min-h-0">
            <ul className="space-y-2">
                <li>
                    <NavLink to="/" className={linkClass}>
                        Home
                    </NavLink>
                </li>
                <li>
                    <div className="font-semibold px-4 py-2">Modules</div>
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
                <li> <NavLink to="/" className={linkClass}> Home </NavLink> </li>
                <li> <NavLink to="/" className={linkClass}> Home </NavLink> </li>
                <li> <NavLink to="/" className={linkClass}> Home </NavLink> </li>
                <li> <NavLink to="/" className={linkClass}> Home </NavLink> </li>
                <li> <NavLink to="/" className={linkClass}> Home </NavLink> </li>
                <li> <NavLink to="/" className={linkClass}> Home </NavLink> </li>
                <li> <NavLink to="/" className={linkClass}> Home </NavLink> </li>
                <li> <NavLink to="/" className={linkClass}> Home </NavLink> </li>
                <li> <NavLink to="/" className={linkClass}> Home </NavLink> </li>
                <li> <NavLink to="/" className={linkClass}> Home </NavLink> </li>
                <li> <NavLink to="/" className={linkClass}> Home </NavLink> </li>
                <li> <NavLink to="/" className={linkClass}> Home </NavLink> </li>
                <li> <NavLink to="/" className={linkClass}> Home </NavLink> </li>
                <li> <NavLink to="/" className={linkClass}> Home </NavLink> </li>
                <li> <NavLink to="/" className={linkClass}> Home </NavLink> </li>
                <li> <NavLink to="/" className={linkClass}> Home </NavLink> </li>
                <li> <NavLink to="/" className={linkClass}> Home </NavLink> </li>
                <li> <NavLink to="/" className={linkClass}> Home </NavLink> </li>
                <li> <NavLink to="/" className={linkClass}> Home </NavLink> </li>
            </ul>
        </nav>
    );
};

export default Sidebar;
