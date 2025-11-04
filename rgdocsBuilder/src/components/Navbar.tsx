import myIcon from "../assets/logo.webp"
import hamburgSVG from "../assets/hamburger.svg"

const Navbar: React.FC = () => {
    return (
        <header className="sticky top-0 z-50 bg-white text-black shadow-sm">
            <div className="flex justify-between items-center h-[46px]">
                <h1 className="hidden sm:block text-xl font-bold px-3">RGdocs</h1>
                <div className="hover:bg-gray-300 rounded-full mx-1.5 p-1.5">
                    <img src={hamburgSVG} className="sm:hidden block h-6" alt="hamburg" />
                </div>
                <div className="flex items-center h-[46px] px-3 hover:bg-gray-200 transition-colors cursor-pointer" onClick={() => window.location.href = "https://www.wasubu.com"}>
                    <h1 className="text-[20px] mr-2 leading-none">Wasubu Minoco</h1>
                    <img src={myIcon} alt="myIcon" className="h-7 w-7 rounded-full object-cover" />
                </div>
            </div>
        </header>

    );
};

export default Navbar;
