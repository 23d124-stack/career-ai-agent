import { Bell, Moon, Sun, Settings } from "lucide-react";
import { useState } from "react";

function Header() {
    const [darkMode, setDarkMode] = useState(false);

    return (
        <div className={`min-h-screen ${
            darkMode
                ? "bg-gray-900 text-white"
                : "bg-white text-black"
        }`}>

            <div className="flex gap-6 items-center">

                <Bell size={22} />

                {darkMode ? (
                    <Sun
                        size={22}
                        className="cursor-pointer"
                        onClick={() => setDarkMode(false)}
                    />
                ) : (
                    <Moon
                        size={22}
                        className="cursor-pointer"
                        onClick={() => setDarkMode(true)}
                    />
                )}

                <Settings size={22} />

            </div>
        </div>
    );
}