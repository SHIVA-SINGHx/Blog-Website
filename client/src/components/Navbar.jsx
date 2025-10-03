import React, { useEffect, useState } from "react";
import {
  Menu,
  X,
  BookOpen,
  LogOut,
  Settings,
  UserCircle,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { MdDarkMode } from "react-icons/md";
import { IoSunnySharp } from "react-icons/io5";
import { Button, HStack } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleSignOut = () => {
    localStorage.removeItem("user");
    setCurrentUser(null);
    setShowDropdown(false);
    navigate("/signin");
  };

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Articles", href: "/posts" },
    { name: "Categories", href: "/categories" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300  bg-white text-black dark:bg-gray-900 dark:text-white${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700"
          : "bg-white shadow-sm dark:bg-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  bg-white text-black dark:bg-gray-900 dark:text-white">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              ShivaBlog
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 font-medium relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Desktop */}
          <div className="hidden md:flex items-center space-x-10">

            <HStack wrap="wrap" gap="2">
              <Button
                variant="outline"
                className="text-black dark:text-white"
                onClick={() => dispatch(toggleTheme())}
              >
                {theme === "light" ? <MdDarkMode /> : <IoSunnySharp />}
              </Button>
            </HStack>

            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <img
                    src={
                      currentUser.profilePicture ||
                      "https://via.placeholder.com/40"
                    }
                    alt={currentUser.username}
                    className="w-10 h-10 rounded-full border-2 border-purple-600 hover:border-purple-700 transition-all cursor-pointer object-cover"
                  />
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                        {currentUser.username || currentUser.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">
                        {currentUser.email}
                      </p>
                    </div>

                    <Link
                      to="/profile"
                      className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      onClick={() => setShowDropdown(false)}
                    >
                      <UserCircle className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                      <span className="text-sm text-gray-700 dark:text-gray-200">
                        Profile
                      </span>
                    </Link>

                    <Link
                      to="/settings"
                      className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      onClick={() => setShowDropdown(false)}
                    >
                      <Settings className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                      <span className="text-sm text-gray-700 dark:text-gray-200">
                        Settings
                      </span>
                    </Link>

                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-red-50 dark:hover:bg-red-900 transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4 text-red-600" />
                      <span className="text-sm text-red-600">Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/signin"
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu  */}
          <div className="md:hidden flex items-center space-x-3">
            <HStack wrap="wrap" gap="2">
              <Button
                variant="outline"
                className="text-black dark:text-white"
                onClick={() => dispatch(toggleTheme())}
              >
                {theme === "light" ? <MdDarkMode /> : <IoSunnySharp />}
              </Button>
            </HStack>
            {currentUser && (
              <img
                src={
                  currentUser.profilePicture || "https://via.placeholder.com/40"
                }
                alt={currentUser.username}
                className="w-9 h-9 rounded-full border-2 border-purple-600 object-cover"
              />
            )}
            <button
              onClick={toggleMenu}
              className="text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-gray-200 dark:border-gray-700">
            {currentUser && (
              <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-lg mb-3">
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                  {currentUser.username || currentUser.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {currentUser.email}
                </p>
              </div>
            )}

            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 font-medium py-2 px-4"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {currentUser ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center space-x-3 text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 font-medium py-2 px-4"
                  onClick={() => setIsOpen(false)}
                >
                  <UserCircle className="w-5 h-5" />
                  <span>Profile</span>
                </Link>

                <Link
                  to="/settings"
                  className="flex items-center space-x-3 text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 font-medium py-2 px-4"
                  onClick={() => setIsOpen(false)}
                >
                  <Settings className="w-5 h-5" />
                  <span>Settings</span>
                </Link>

                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center space-x-3 text-red-600 hover:text-red-700 transition-colors duration-200 font-medium py-2 px-4 text-left"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <Link
                to="/signin"
                className="block px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 text-center"
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        )}
      </div>

      {showDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowDropdown(false)}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
