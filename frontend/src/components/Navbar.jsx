import { useEffect, useState, useRef } from "react";
import { 
  FaSun, 
  FaMoon, 
  FaPlane, 
  FaMapMarkerAlt, 
  FaSuitcase,
  FaUserCircle,
  FaBell,
  FaChevronDown
} from "react-icons/fa";
import { 
  MdOutlineColorLens, 
  MdOutlineSupportAgent
} from "react-icons/md";
import { GiJourney } from "react-icons/gi";
import { HiMenu, HiX } from "react-icons/hi";
import ThemeColorPicker from "./ThemeColorPicker";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [isDark, setIsDark] = useState(
    () => localStorage.getItem("theme") === "dark",
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Change this based on auth state
  const [activeLink, setActiveLink] = useState("");
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  
  const mobileMenuRef = useRef(null);
  const menuButtonRef = useRef(null);

  // Apply theme
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  // Handle scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Handle active link based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['destinations', 'packages', 'about', 'support'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) setActiveLink(currentSection);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (mobileMenuOpen && 
          mobileMenuRef.current && 
          !mobileMenuRef.current.contains(e.target) && 
          menuButtonRef.current && 
          !menuButtonRef.current.contains(e.target)) {
        setMobileMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const headerClasses = `
    transition-all duration-500 mx-2 md:mx-auto
    ${
      scrolled
        ? "mt-4 rounded-2xl backdrop-blur-xl bg-white/95 dark:bg-gray-900/95 shadow-2xl max-w-7xl border border-white/40 dark:border-gray-800/60"
        : "mt-2 rounded-2xl bg-white/90 dark:bg-gray-950/90 backdrop-blur-lg max-w-7xl border border-white/30 dark:border-gray-800/40 shadow-lg"
    }
  `;

  const navLinks = [
    { id: 'destinations', label: "Destinations", href: "#destinations", icon: FaMapMarkerAlt },
    { id: 'packages', label: "Packages", href: "#packages", icon: GiJourney },
    { id: 'about', label: "About", href: "#about", icon: FaSuitcase },
    { id: 'support', label: "Support", href: "#support", icon: MdOutlineSupportAgent },
  ];

  // Enhanced hover animation variants
  const linkVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      aria-label="Main Navigation"
    >
      <header className={headerClasses}>
        <div className="h-20 px-6 md:px-12 flex items-center justify-between">
          {/* Logo - Keeping your original design */}
          <a 
            href="/" 
            className="relative group flex items-center select-none"
            onMouseEnter={() => setIsHoveringLink(true)}
            onMouseLeave={() => setIsHoveringLink(false)}
          >
            {/* Brand Text */}
            <span className="text-2xl md:text-3xl font-bold tracking-tight text-gray-800 dark:text-white transition-all duration-300 group-hover:drop-shadow-lg">
              Nomad
              <span 
                className="transition-all duration-500 group-hover:drop-shadow-[0_0_8px_rgba(var(--color-primary),0.6)]"
                style={{ color: "rgb(var(--color-primary))" }}
              >
                Go
              </span>
            </span>

            {/* Flight Path */}
            <svg
              viewBox="0 0 120 40"
              className="absolute -top-1 left-6 w-[110px] h-[40px] pointer-events-none transition-all duration-700"
            >
              <path
                d="M5 28 Q 60 0 115 18"
                fill="none"
                stroke="rgb(var(--color-primary))"
                strokeWidth="2"
                strokeDasharray="3,6"
                opacity="0.5"
                className="transition-all duration-700 group-hover:stroke-dasharray-6,3 group-hover:opacity-80"
              />
            </svg>

            {/* Plane with enhanced hover animation */}
            <FaPlane
              size={16}
              className="absolute -top-1 left-14 text-[rgb(var(--color-primary))] -rotate-12 transition-all duration-700
                group-hover:translate-x-6 group-hover:-translate-y-2 group-hover:rotate-12 group-hover:scale-110"
            />
            
            {/* Hover glow effect */}
            <div className="absolute -inset-2 rounded-lg bg-gradient-to-r from-transparent via-[rgba(var(--color-primary),0.1)] to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10"></div>
          </a>

          {/* Desktop Navigation Links - Enhanced hover animations */}
          <ul 
            className="hidden lg:flex items-center gap-1"
            onMouseEnter={() => setIsHoveringLink(true)}
            onMouseLeave={() => setIsHoveringLink(false)}
          >
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeLink === link.id;
              
              return (
                <li key={link.label} className="relative">
                  <a
                    href={link.href}
                    className={`
                      flex items-center gap-2 px-5 py-2.5 mx-1 rounded-xl
                      font-medium text-sm transition-all duration-300 relative
                      overflow-hidden group/link
                      ${isActive 
                        ? 'text-gray-900 dark:text-white' 
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                      }
                    `}
                    onClick={() => setActiveLink(link.id)}
                    onMouseEnter={(e) => {
                      setIsHoveringLink(true);
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      setIsHoveringLink(false);
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                    onMouseDown={(e) => {
                      e.currentTarget.style.transform = 'scale(0.95)';
                    }}
                    onMouseUp={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                  >
                    {/* Background glow on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(var(--color-primary),0.1)] to-transparent opacity-0 group-hover/link:opacity-100 transition-opacity duration-300 -z-10 rounded-xl"></div>
                    
                    {/* Icon with animation */}
                    <Icon 
                      size={16} 
                      className={`
                        transition-all duration-300 relative z-10
                        ${isActive 
                          ? 'scale-110 opacity-100' 
                          : 'opacity-70 group-hover/link:opacity-100 group-hover/link:scale-110'
                        }
                      `}
                      style={isActive ? { color: "rgb(var(--color-primary))" } : {}}
                    />
                    
                    {/* Text with slide animation */}
                    <span className="relative z-10 transition-all duration-300 transform group-hover/link:translate-x-0.5">
                      {link.label}
                    </span>
                    
                    {/* Active indicator line */}
                    <div 
                      className={`
                        absolute bottom-0 left-4 right-4 h-0.5
                        transition-all duration-300 origin-left
                        ${isActive ? 'scale-x-100' : 'scale-x-0'}
                      `}
                      style={{ 
                        backgroundColor: "rgb(var(--color-primary))",
                        boxShadow: `0 0 8px rgba(var(--color-primary), 0.5)`
                      }}
                    ></div>
                    
                    {/* Hover indicator line */}
                    <div 
                      className={`
                        absolute bottom-0 left-4 right-4 h-0.5
                        transition-all duration-300 origin-left
                        scale-x-0 group-hover/link:scale-x-100
                        ${isActive ? 'group-hover/link:scale-x-100' : ''}
                      `}
                      style={{ 
                        backgroundColor: "rgb(var(--color-primary))",
                        opacity: isActive ? 0.7 : 0.5
                      }}
                    ></div>
                    
                    {/* Ripple effect on click */}
                    <div className="absolute inset-0 rounded-xl overflow-hidden">
                      <div className="absolute inset-0 bg-[rgb(var(--color-primary))] opacity-0 group-active/link:opacity-10 transition-opacity duration-200"></div>
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Mobile Menu Button - Enhanced touch feedback */}
          <button
            ref={menuButtonRef}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 active:bg-gray-200 dark:active:bg-gray-700 transition-all duration-300 active:scale-95 menu-button"
            aria-label="Toggle menu"
            onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
            onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
            onTouchStart={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
            onTouchEnd={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div className="relative">
              {mobileMenuOpen ? (
                <HiX size={24} className="text-gray-700 dark:text-gray-300" />
              ) : (
                <HiMenu size={24} className="text-gray-700 dark:text-gray-300" />
              )}
              {/* Button glow effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-[rgba(var(--color-primary),0.1)] to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </button>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Show Account & Notification only when logged in */}
            {isLoggedIn ? (
              <>
                {/* Notification Bell with enhanced hover */}
                <button 
                  className="relative p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 active:bg-gray-200 dark:active:bg-gray-700 transition-all duration-300 group/notif active:scale-95"
                  onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
                  onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <FaBell size={18} className="text-gray-600 dark:text-gray-400 group-hover/notif:text-gray-900 dark:group-hover/notif:text-white transition-colors" />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse ring-2 ring-white dark:ring-gray-900"></span>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-[rgba(var(--color-primary),0.1)] to-transparent opacity-0 group-hover/notif:opacity-100 transition-opacity duration-300"></div>
                </button>

                {/* User Profile with enhanced hover */}
                <button 
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 active:bg-gray-200 dark:active:bg-gray-700 transition-all duration-300 group/profile active:scale-95"
                  onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
                  onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <div className="w-9 h-9 rounded-full flex items-center justify-center relative overflow-hidden group-hover/profile:scale-110 transition-transform duration-300"
                       style={{ backgroundColor: "rgba(var(--color-primary), 0.1)" }}>
                    <FaUserCircle size={18} 
                      className="relative z-10 transition-all duration-300 group-hover/profile:scale-110"
                      style={{ color: "rgb(var(--color-primary))" }} />
                    <div className="absolute inset-0 bg-gradient-to-br from-[rgba(var(--color-primary),0.2)] to-transparent opacity-0 group-hover/profile:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Account</span>
                  <FaChevronDown size={12} className="text-gray-500 dark:text-gray-400 group-hover/profile:text-gray-700 dark:group-hover/profile:text-gray-300 transition-colors" />
                </button>
              </>
            ) : null}

            {/* Theme Color Picker */}
            <div className="relative">
              <button
                aria-label="Theme color picker"
                onClick={() => setIsPickerOpen((p) => !p)}
                className="p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 active:bg-gray-200 dark:active:bg-gray-700 transition-all duration-300 group/picker active:scale-95"
                onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
                onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <MdOutlineColorLens size={22} className="group-hover/picker:rotate-180 transition-all duration-500 group-active/picker:scale-90"
                  style={{ color: "rgb(var(--color-primary))" }} />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-[rgba(var(--color-primary),0.1)] to-transparent opacity-0 group-hover/picker:opacity-100 transition-opacity duration-300"></div>
              </button>

              {isPickerOpen && (
                <div className="absolute right-0 mt-2 z-[60] shadow-2xl animate-in fade-in slide-in-from-top-2 duration-300">
                  <ThemeColorPicker close={() => setIsPickerOpen(false)} />
                </div>
              )}
            </div>

            {/* Dark Mode Toggle with enhanced animation */}
            <button
              aria-label="Toggle dark mode"
              onClick={() => setIsDark((d) => !d)}
              className="relative w-16 h-8 flex items-center rounded-full p-1 transition-all duration-500 active:scale-95 group/toggle"
              style={{
                backgroundColor: isDark
                  ? "rgba(var(--color-primary), 0.2)"
                  : "rgba(var(--color-primary), 0.1)",
              }}
              onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
              onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-white transition-all duration-500 shadow-lg transform ${
                  isDark ? "translate-x-8 rotate-180" : "translate-x-0 rotate-0"
                } group-hover/toggle:scale-110`}
                style={{
                  backgroundColor: "rgb(var(--color-primary))",
                }}
              >
                {isDark ? <FaMoon size={12} /> : <FaSun size={12} />}
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-[rgba(var(--color-primary),0.1)] to-transparent opacity-0 group-hover/toggle:opacity-100 transition-opacity duration-300"></div>
            </button>

            {/* Book Now Button with enhanced hover */}
            <a
              href="/book"
              className="px-7 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 text-white shadow-lg hover:shadow-xl active:shadow-md active:scale-95 relative overflow-hidden group/book"
              style={{
                backgroundColor: "rgb(var(--color-primary))",
                boxShadow: `0 4px 20px rgba(var(--color-primary), 0.4)`
              }}
              onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
              onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
              onTouchStart={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
              onTouchEnd={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/book:translate-x-full transition-transform duration-1000"></div>
              <span className="relative z-10">Book Now</span>
            </a>
          </div>
        </div>

        {/* Mobile Menu - Enhanced with better animations and touch feedback */}
        {mobileMenuOpen && (
          <div className="lg:hidden" ref={mobileMenuRef}>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-40 animate-in fade-in duration-300"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <div className="fixed top-24 left-4 right-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/40 dark:border-gray-800/60 overflow-hidden z-50 animate-in slide-in-from-top-5 duration-300">
              <div className="p-4 max-h-[70vh] overflow-y-auto">
                {/* Show Account & Notification in mobile when logged in */}
                {isLoggedIn && (
                  <div className="flex items-center justify-between mb-4 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 active:scale-95 transition-all duration-200">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center relative"
                           style={{ backgroundColor: "rgba(var(--color-primary), 0.1)" }}>
                        <FaUserCircle size={24} 
                          style={{ color: "rgb(var(--color-primary))" }} />
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[rgba(var(--color-primary),0.3)] to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <div>
                        <p className="font-semibold">John Doe</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">View Profile</p>
                      </div>
                    </div>
                    <button className="relative p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 active:scale-95 transition-all duration-200">
                      <FaBell size={20} />
                      <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white dark:ring-gray-900"></span>
                    </button>
                  </div>
                )}
                
                {/* Quick Actions for mobile */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  <a 
                    href="/book-ride" 
                    className="p-4 rounded-xl bg-gradient-to-br text-white font-medium active:scale-95 transition-all duration-200 flex flex-col items-center justify-center gap-2"
                    style={{ background: `linear-gradient(135deg, rgb(var(--color-primary)), rgb(var(--color-primary-dark)))` }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FaMapMarkerAlt size={20} />
                    <span>Book Ride</span>
                  </a>
                  <a 
                    href="#packages" 
                    className="p-4 rounded-xl bg-gray-100 dark:bg-gray-800 font-medium active:scale-95 transition-all duration-200 flex flex-col items-center justify-center gap-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <GiJourney size={20} />
                    <span>Packages</span>
                  </a>
                </div>
                
                {/* Navigation Links with enhanced touch feedback */}
                <div className="space-y-1">
                  {navLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = activeLink === link.id;
                    
                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        className={`
                          flex items-center gap-4 p-4 rounded-xl
                          font-medium transition-all duration-200 active:scale-95
                          ${isActive 
                            ? 'bg-[rgba(var(--color-primary),0.1)] text-gray-900 dark:text-white' 
                            : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                          }
                        `}
                        onClick={() => {
                          setActiveLink(link.id);
                          setMobileMenuOpen(false);
                        }}
                        onTouchStart={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
                        onTouchEnd={(e) => e.currentTarget.style.transform = 'scale(1)'}
                      >
                        <Icon size={20} 
                          style={isActive ? { color: "rgb(var(--color-primary))" } : {}} 
                          className={isActive ? 'scale-110' : ''}
                        />
                        <span>{link.label}</span>
                        {isActive && (
                          <div className="ml-auto w-2 h-2 rounded-full"
                               style={{ backgroundColor: "rgb(var(--color-primary))" }}></div>
                        )}
                      </a>
                    );
                  })}
                </div>

                {/* Auth Section for non-logged in users */}
                {!isLoggedIn && (
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 px-3">Sign in for better experience</p>
                    <div className="grid grid-cols-2 gap-3">
                      <a 
                        href="/login" 
                        className="p-3 text-center rounded-xl border border-gray-300 dark:border-gray-700 font-medium active:scale-95 transition-all duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Sign In
                      </a>
                      <a 
                        href="/register" 
                        className="p-3 text-center rounded-xl font-medium text-white active:scale-95 transition-all duration-200"
                        style={{ backgroundColor: "rgb(var(--color-primary))" }}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Sign Up
                      </a>
                    </div>
                  </div>
                )}

                {/* Mobile Book Now Button */}
                <div className="mt-6">
                  <a
                    href="/book"
                    className="block p-4 rounded-xl text-center font-semibold text-white active:scale-95 transition-all duration-200 relative overflow-hidden"
                    style={{ 
                      backgroundColor: "rgb(var(--color-primary))",
                      boxShadow: `0 4px 20px rgba(var(--color-primary), 0.4)`
                    }}
                    onClick={() => setMobileMenuOpen(false)}
                    onTouchStart={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
                    onTouchEnd={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000"></div>
                    <span className="relative z-10">Book Now</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Background Glow Effect */}
      <div className="absolute inset-0 -top-10 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full"
             style={{
               background: `radial-gradient(circle, rgba(var(--color-primary), 0.15) 0%, transparent 70%)`,
               filter: 'blur(60px)'
             }}></div>
      </div>
    </nav>
  );
};

export default Navbar;