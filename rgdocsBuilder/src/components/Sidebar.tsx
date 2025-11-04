import { NavLink } from "react-router-dom";
import logo from "../assets/RGdocLogo.webp"

const Sidebar: React.FC = () => {
    const linkClassCommon = "block px-4 py-2 rounded hover:bg-blue-100 "
    const linkClass = ({ isActive }: { isActive: boolean }) =>
        `${linkClassCommon} ${isActive ? "bg-gray-200 font-semibold" : ""}`;
    const linkClassBold = ({ isActive }: { isActive: boolean }) =>
        `${linkClassCommon} font-semibold ${isActive ? "bg-gray-200" : ""}`;

    return (
        <div className="relative w-64 h-screen overflow-hidden bg-gray-100">
            <div className="absolute top-0 left-0 right-[15px] z-10 flex justify-center bg-gray-100/80 backdrop-blur-sm">
                <img src={logo} alt="logo" className="mt-7 mb-7 w-50 h-fit " />
            </div>
            <nav className="h-full overflow-y-auto p-4 pt-37">
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
                <h1 className="mt-8">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum magnam praesentium modi odit exercitationem pariatur vero non nulla harum quibusdam facilis dolore placeat, quo distinctio perferendis quam nobis quisquam a?</h1>
                <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum magnam praesentium modi odit exercitationem pariatur vero non nulla harum quibusdam facilis dolore placeat, quo distinctio perferendis quam nobis quisquam a?</h1>
                <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum magnam praesentium modi odit exercitationem pariatur vero non nulla harum quibusdam facilis dolore placeat, quo distinctio perferendis quam nobis quisquam a?</h1>
                <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum magnam praesentium modi odit exercitationem pariatur vero non nulla harum quibusdam facilis dolore placeat, quo distinctio perferendis quam nobis quisquam a?</h1>
                <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum magnam praesentium modi odit exercitationem pariatur vero non nulla harum quibusdam facilis dolore placeat, quo distinctio perferendis quam nobis quisquam a?</h1>
            </nav >
        </div>
    );
};

export default Sidebar;
