import {
  LayoutDashboard,
  User,
  FileText,
  Settings,
  Briefcase,
  ClipboardList,
  BrainCircuit,
  Map,
  MessageSquare,
  Bell,
  LogOut,
} from "lucide-react";

import { NavLink } from "react-router-dom";

function Sidebar() {
  const email = localStorage.getItem("email");

  const menuItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      name: "Profile",
      icon: User,
      path: "/profile",
    },
    {
      name: "Resume",
      icon: FileText,
      path: "/resume",
    },
    {
      name: "Preferences",
      icon: Settings,
      path: "/preferences",
    },
    {
      name: "Jobs",
      icon: Briefcase,
      path: "/jobs",
    },
    {
      name: "Applications",
      icon: ClipboardList,
      path: "/applications",
    },
    {
      name: "AI Mentor",
      icon: BrainCircuit,
      path: "/mentor",
    },
    {
      name: "Roadmap",
      icon: Map,
      path: "/roadmap",
    },
    {
      name: "AI Chat",
      icon: MessageSquare,
      path: "/chat",
    },
    {
      name: "Reminders",
      icon: Bell,
      path: "/reminders",
    },
  ];

  return (
    <div className="w-72 h-screen bg-slate-900 text-white flex flex-col">

      {/* Logo */}
      <div className="p-8 border-b border-slate-700">
        <h1 className="text-3xl font-bold text-blue-400">
          CareerPilot AI
        </h1>

        <p className="text-slate-400 mt-2">
          Smart Career Assistant
        </p>
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto px-4 py-6">

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-5 py-4 rounded-xl mb-2 transition-all duration-300
                ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg"
                    : "hover:bg-slate-800 text-slate-300"
                }`
              }
            >
              <Icon size={22} />

              <span className="font-medium">
                {item.name}
              </span>
            </NavLink>
          );
        })}
      </div>

      {/* User Info */}
      <div className="border-t border-slate-700 p-5">

        <div className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-xl font-bold">
            {email ? email.charAt(0).toUpperCase() : "U"}
          </div>

          <div className="flex-1">

            <p className="font-semibold">
              Welcome
            </p>

            <p className="text-xs text-slate-400 truncate">
              {email}
            </p>

          </div>
        </div>

        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
          className="mt-5 flex items-center justify-center gap-2 w-full bg-red-500 hover:bg-red-600 rounded-lg py-3 transition"
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>
    </div>
  );
}

export default Sidebar;