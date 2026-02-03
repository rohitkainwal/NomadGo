import { useEffect, useState } from "react";
import { FaSun, FaMoon, FaPlane } from "react-icons/fa";
import { MdOutlineColorLens } from "react-icons/md";
import ThemeColorPicker from "./ThemeColorPicker";


const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [isDark, setIsDark] = useState(
    () => localStorage.getItem("theme") === "dark",
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const headerClasses = `
    transition-all duration-500 mx-2 md:mx-auto
    ${
      scrolled
        ? "mt-4 rounded-2xl backdrop-blur-xl bg-white/80 dark:bg-zinc-900/90 shadow-xl max-w-6xl border border-gray-200/50 dark:border-zinc-800"
        : "mt-2 rounded-2xl bg-white dark:bg-zinc-950 max-w-7xl shadow-sm"
    }
  `;

  const navLinks = [
    { label: "Destinations", href: "#destinations" },
    { label: "Packages", href: "#packages" },
    { label: "About", href: "#about" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      aria-label="Main Navigation"
    >
      <header className={headerClasses}>
        <div className="h-20 md:h-20 px-6 md:px-12 flex items-center justify-between">
          {/* Logo with S-curve dotted line and plane */}
          <a href="/" className="relative group flex items-center select-none">
            {/* Brand Text */}
            <span className="text-2xl md:text-3xl font-bold tracking-tight text-gray-800 dark:text-white">
              Nomad
              <span style={{ color: "rgb(var(--color-primary))" }}>Go</span>
            </span>

            {/* Flight Path */}
            <svg
              viewBox="0 0 120 40"
              className="absolute -top-1 left-6 w-[110px] h-[40px] pointer-events-none"
            >
              <path
                d="M5 28 Q 60 0 115 18"
                fill="none"
                stroke="rgb(var(--color-primary))"
                strokeWidth="2"
                strokeDasharray="3,6"
                opacity="0.5"
              />
            </svg>

            {/* Plane */}
            <FaPlane
              size={16}
              className="absolute -top-1 left-14 text-[rgb(var(--color-primary))] -rotate-12 transition-all duration-700
      group-hover:translate-x-6 group-hover:-translate-y-2"
            />
          </a>

          {/* Navigation Links - Centered */}
          <ul className="hidden lg:flex items-center gap-12 text-gray-600 dark:text-gray-400 font-medium text-base">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="hover:text-gray-900 dark:hover:text-white transition-colors duration-300 relative group/link"
                >
                  {link.label}
                  <span
                    className="absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover/link:w-full"
                    style={{ backgroundColor: "rgb(var(--color-primary))" }}
                  ></span>
                </a>
              </li>
            ))}
          </ul>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Theme Color Picker */}
            <div className="relative">
              <button
                aria-label="Theme color picker"
                onClick={() => setIsPickerOpen((p) => !p)}
                className="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                style={{ color: "rgb(var(--color-primary))" }}
              >
                <MdOutlineColorLens size={22} />
              </button>

              {isPickerOpen && (
                <div className="absolute right-0 mt-4 z-[60] shadow-2xl animate-in fade-in slide-in-from-top-2">
                  <ThemeColorPicker close={() => setIsPickerOpen(false)} />
                </div>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <button
              aria-label="Toggle dark mode"
              onClick={() => setIsDark((d) => !d)}
              className="relative w-14 h-7 flex items-center rounded-full p-1 transition-all duration-500 border border-gray-200 dark:border-zinc-700"
              style={{
                backgroundColor: isDark
                  ? "rgba(var(--color-primary), 0.15)"
                  : "#fffbeb",
              }}
            >
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center text-white transition-all duration-500 shadow-md ${
                  isDark ? "translate-x-7" : "translate-x-0"
                }`}
                style={{
                  backgroundColor: isDark
                    ? "rgb(var(--color-primary))"
                    : "#fbbf24",
                }}
              >
                {isDark ? <FaMoon size={10} /> : <FaSun size={10} />}
              </div>
            </button>

            {/* Book Now Button */}
            <a
              href="/book"
              className="hidden sm:block px-8 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 text-white shadow-md hover:shadow-lg"
              style={{
                backgroundColor: "rgb(var(--color-primary))",
              }}
            >
              Book Now
            </a>
          </div>
        </div>
      </header>
        
    </nav>
  );
};

export default Navbar;
