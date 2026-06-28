import {
  Bell,
  Search,
  Settings,
  Moon,
  Sun,
} from "lucide-react";

import { useState, useEffect } from "react";

function TopNavbar() {
  const [showMenu, setShowMenu] = useState(false);

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const email = localStorage.getItem("email") || "Guest";
  const username = email.split("@")[0];

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <header
      className="
      bg-white
      dark:bg-gray-900
      dark:text-white
      h-20
      shadow-sm
      border-b
      dark:border-gray-700
      flex
      items-center
      justify-between
      px-8
      sticky
      top-0
      z-50
    "
    >
      {/* Search */}
      <div className="relative w-[420px]">
        <Search
          className="absolute left-4 top-3.5 text-gray-400"
          size={20}
        />

        <input
          type="text"
          placeholder="Search jobs, skills, companies..."
          className="
            w-full
            border
            rounded-xl
            pl-12
            pr-4
            py-3
            bg-white
            dark:bg-gray-800
            dark:text-white
            dark:border-gray-700
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
          "
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-6">

        {/* Notification */}
        <button className="relative hover:text-blue-600 transition">
          <Bell size={23} />

          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
            3
          </span>
        </button>

        {/* Dark Mode */}
        <button
          className="hover:text-blue-600 transition"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? (
            <Sun size={22} />
          ) : (
            <Moon size={22} />
          )}
        </button>

        {/* Settings */}
        <button className="hover:text-blue-600 transition">
          <Settings size={22} />
        </button>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center gap-3"
          >
            <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
              {username.charAt(0).toUpperCase()}
            </div>

            <div className="text-left hidden md:block">
              <p className="font-semibold">
                {username}
              </p>

              <p className="text-xs text-gray-500 dark:text-gray-400">
                AI Career User
              </p>
            </div>

            <span className="text-gray-500">
              ▼
            </span>
          </button>

          {/* Dropdown */}
          {showMenu && (
            <div
              className="
                absolute
                right-0
                mt-3
                w-60
                bg-white
                dark:bg-gray-800
                rounded-xl
                shadow-xl
                border
                dark:border-gray-700
                overflow-hidden
              "
            >
              <div className="p-4 border-b dark:border-gray-700">
                <p className="font-semibold">
                  {username}
                </p>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {email}
                </p>
              </div>

              <button
                className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() =>
                  (window.location.href = "/profile")
                }
              >
                👤 My Profile
              </button>

              <button
                className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() =>
                  (window.location.href = "/preferences")
                }
              >
                ⚙ Preferences
              </button>

              <button
                className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() =>
                  (window.location.href = "/resume")
                }
              >
                📄 Resume
              </button>

              <button
                className="
                  w-full
                  text-left
                  px-4
                  py-3
                  text-red-600
                  hover:bg-red-50
                  dark:hover:bg-red-900
                "
                onClick={() => {
                  localStorage.clear();
                  window.location.href = "/login";
                }}
              >
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default TopNavbar;