import logo from "../assets/logo.webp"

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-100 mt-12 rounded-t-xl">
            <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col items-center justify-between space-y-4 ">

                {/* <!-- Left: Logo + Name --> */}
                <div className="flex items-center space-x-3">
                    <img className="h-10 w-10 rounded-full shadow md:hidden block" src={logo} alt="Wasubu logo" />
                    <span className="font-semibold text-lg md:hidden block">Wasubu Minoco</span>
                </div>

                {/* <!-- Center: Navigation --> */}
                <nav className="flex space-x-6 text-gray-600 text-sm">
                    <a href="https://github.com/wasubu/mino-website" target="_blank"
                        className="hover:text-gray-900 transition">Repo</a>
                    <a href="https://ko-fi.com/minoco" target="_blank" className="hover:text-gray-900 transition">Donate</a>
                    <a href="/unavailable.html" className="hover:text-gray-900 transition">About</a>
                    <a href="/unavailable.html" className="hover:text-gray-900 transition">Contact</a>
                </nav>

                {/* <!-- Right: Socials --> */}
                <div className="flex space-x-4">
                    <a href="https://github.com/wasubu" target="_blank">
                        <img src="assets/github.svg" alt="GitHub"
                            className="h-6 w-6 hover:opacity-80 transition filter-gray" />
                    </a>
                    <a href="https://www.youtube.com/@minoco418" target="_blank">
                        <img src="assets/youtube.svg" alt="YouTube"
                            className="h-6 w-6 hover:opacity-80 transition filter-gray" />
                    </a>
                    <a href="/unavailable.html" target="_blank">
                        <img src="assets/insta.svg" alt="Instagram"
                            className="h-6 w-6 hover:opacity-80 transition filter-gray" />
                    </a>
                </div>
            </div>

            {/* <!-- Bottom Bar --> */}
            <div className="border-t border-gray-300 text-center text-sm text-gray-500 py-4">
                © <span id="year"></span> Wasubu Minoco. All rights reserved.
            </div>
        </footer>
    )
};

export default Footer;