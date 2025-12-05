import { NavLink } from "react-router-dom";
import logo from "../assets/RGdocLogo.webp"
import type React from "react";

const Sidebar: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
    const indentedItems = "ml-4 space-y-1"
    const scrollbarStyle = "[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-200/50 [&::-webkit-scrollbar-thumb:active]:bg-gray-200/100"
    const sidebarStyle = `sm:shadow-none shadow-xl text-nowrap bg-gray-100 relative h-screen overflow-hidden transition-all duration-400 ${isOpen ? "translate-x-0 w-64 text-black" : "-translate-x-full w-0 text-black/0"}`

    return (
        <div className={sidebarStyle}>
            <div className="absolute top-0 left-0 right-[15px] z-10 flex justify-center bg-gray-100/80 backdrop-blur-sm">
                <img src={logo} alt="logo" className="mt-7 mb-7 w-50 h-fit " />
            </div>
            <nav className={`h-full overflow-y-auto py-4 px-4 pt-37 ${scrollbarStyle}`}>
                <ul className="space-y-1">
                    <ParentElement to="/">Welcome!</ParentElement>
                    <ParentElement to="/introductory">Introductory</ParentElement>
                    <ParentElement to="/experiment">Experiment</ParentElement>
                    <ParentElement to="/retro-gadget-tutorials">Retro Gadget Tutorials</ParentElement>
                    <ElementGroup><ParentElement to="/misc-modules">Misc Modules</ParentElement>
                        <ul className={indentedItems}>
                            <IndentedElement to="/cpu">CPU</IndentedElement>
                            <IndentedElement to="/videochip">Video Chip</IndentedElement>
                            <IndentedElement to="/wifichip">Wifi Chip</IndentedElement>
                            <IndentedElement to="/audiochip">Audio Chip</IndentedElement>
                            <IndentedElement to="/rom">ROM</IndentedElement>
                            <IndentedElement to="/realitychip">Reality Chip</IndentedElement>
                            <IndentedElement to="/keyboardchip">Keyboard Chip</IndentedElement>
                            <IndentedElement to="/gamepadchip">Gamepad Chip</IndentedElement>
                            <IndentedElement to="/magneticconnector">Magnetic Connector</IndentedElement>
                            <IndentedElement to="/securitychip">Security Chip</IndentedElement>
                            <IndentedElement to="/serial">Serial</IndentedElement>
                        </ul>
                    </ElementGroup>
                    <ElementGroup><ParentElement to="/output-modules">Output Modules</ParentElement>
                        <ul className={indentedItems}>
                            <IndentedElement to="/led">Led</IndentedElement>
                            <IndentedElement to="/speaker">Speaker</IndentedElement>
                        </ul>
                    </ElementGroup>
                    <ElementGroup><ParentElement to="/input-modules">Input Modules</ParentElement>
                        <ul className={indentedItems}>
                            <li>
                                <IndentedElement to="/dpad">Dpad</IndentedElement>
                            </li>
                            <li>
                                <IndentedElement to="/slider">Slider</IndentedElement>
                            </li>
                        </ul>
                    </ElementGroup>
                </ul>
            </nav >
        </div>
    );
};

/*
Misc:
* [x] Reality Chip
* [x] CPU Chip
* [x] Video Chip
* [x] ROM
* [x] Audio Chip
* [x] Keyboard Chip
* [x] Gamepad Chip
* [x] Magnetic Connector
* [x] Security Chip
* [x] Serial
* [ ] Wifi Chip
* [ ] Decoration
Input:
* [x] DPad
* [x] slider
* [ ] Switch
* [ ] Knob
* [ ] Analog Stick
* [ ] Keypad
* [ ] Led Button
* [ ] Webcam
* [ ] ScreenButton
Output:
* [x] Speaker
* [x] led
* [ ] screen
* [ ] Led Matrix
* [ ] Flash Memory
* [ ] Power Button
* [ ] Led Strip
* [ ] Segment Display
* [ ] Analog Guage
* [ ] Lcd Display
*/

function Dummy() {
    const indentedItems = "ml-4 space-y-1"
    return (
        <>
            <ElementGroup><ParentElement to="/output-modules">Output Modules</ParentElement>
                <ul className={indentedItems}>
                    <IndentedElement to="/led">Led</IndentedElement>
                    <IndentedElement to="/speaker">Speaker</IndentedElement>
                </ul>
            </ElementGroup>
            <ElementGroup><ParentElement to="/input-modules">Input Modules</ParentElement>
                <ul className={indentedItems}>
                    <li>
                        <IndentedElement to="/dpad">Dpad</IndentedElement>
                    </li>
                    <li>
                        <IndentedElement to="/slider">Slider</IndentedElement>
                    </li>
                </ul>
            </ElementGroup>
        </>
    )
}

function IndentedElement({ to, children }: { to: string; children: React.ReactNode }) {
    const linkClassCommon = "block px-3 py-2 rounded-md "
    const linkClass = ({ isActive }: { isActive: boolean }) =>
        `${linkClassCommon} border-l-2 hover:bg-blue-100 hover:border-blue-300 ${isActive ? "bg-gray-200 font-semibold border-gray-400" : "border-gray-200"}`;
    return (
        <NavLink to={to} className={linkClass}>
            {children}
        </NavLink>
    )
}

function ParentElement({ to, children }: { to: string; children: React.ReactNode }) {
    const linkClassCommon = "block px-3 py-2 rounded-md "
    const linkClassBold = ({ isActive }: { isActive: boolean }) =>
        `${linkClassCommon} font-semibold hover:bg-blue-100 ${isActive ? "bg-gray-200 font-bold" : ""}`;
    return (
        <NavLink to={to} className={linkClassBold} end>
            {children}
        </NavLink>
    )
}

function ElementGroup({ children }: { children: React.ReactNode }) {
    return <li className="space-y-1">{children}</li>
}

export default Sidebar;
