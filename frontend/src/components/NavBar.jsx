import { useState, useEffect } from "react";
import { Link, useResolvedPath } from "react-router-dom";
import { ShoppingBag, SunMedium, Moon } from "lucide-react";
import { useProductStore } from "../store/useProductStore";

const NavBar = () => {
    const { pathname} = useResolvedPath();
    const isHomePage = pathname !== "/";
    const {products} = useProductStore();
    console.log(products.length);
    // Get theme from localStorage or system preference
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const defaultDarkMode = storedTheme ? storedTheme === "dark" : prefersDark;

    // State to track dark mode
    const [isDarkMode, setIsDarkMode] = useState(defaultDarkMode);

    // Toggle Theme
    const toggleTheme = () => {
        const newTheme = isDarkMode ? "light" : "dark";
        setIsDarkMode(!isDarkMode);
        localStorage.setItem("theme", newTheme);

        if (newTheme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    };

    // Apply theme on component mount
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [isDarkMode]);

    return (
        <nav className="fixed top-0 w-full border-b border-gray-300 dark:border-gray-700 py-3 bg-white dark:bg-gray-900 z-50 transition-colors duration-300">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="text-2xl font-mono font-bold uppercase text-black dark:text-white transition-colors duration-300"
                    >
                        store
                    </Link>

                    {/* Nav Links */}
                    <div className="flex items-center gap-4">
                        {/* Theme Toggle Button */}
                        <button
                            className="p-2  text-black dark:text-white transition"
                            onClick={toggleTheme}
                        >
                            {isDarkMode ? <SunMedium /> : <Moon />}
                        </button>

                        {/* Shopping Bag Icon (Only on non-home pages) */}
                        {!isHomePage && (
                            <div className="relative rounded-full bg-neutral-200 dark:bg-gray-700 flex items-center p-2">
                                <ShoppingBag className="text-black dark:text-white transition-colors duration-300" />
                                <span className="absolute top-0 right-0 transform ml-2 translate-x-1/2 -translate-y-1/2 text-black dark:text-white rounded-full text-xs font-bold flex items-center justify-center">
                                    {products.length}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
