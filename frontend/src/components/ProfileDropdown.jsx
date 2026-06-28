import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function ProfileDropdown() {
  const [open, setOpen] = useState(false);

  const name = localStorage.getItem("name") || "Monika";

  return (
    <div className="relative">

      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3"
      >
        <img
          src="https://ui-avatars.com/api/?name=User"
          className="w-10 h-10 rounded-full"
        />

        <span>{name}</span>

        <ChevronDown size={18} />
      </button>

      {open && (
        <div className="absolute right-0 mt-3 bg-white rounded-lg shadow-lg w-48">

          <a
            href="/profile"
            className="block px-4 py-3 hover:bg-gray-100"
          >
            My Profile
          </a>

          <a
            href="/preferences"
            className="block px-4 py-3 hover:bg-gray-100"
          >
            Preferences
          </a>

          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
            className="w-full text-left px-4 py-3 hover:bg-gray-100"
          >
            Logout
          </button>

        </div>
      )}

    </div>
  );
}