import { Bell } from "lucide-react";

export default function NotificationBell() {

  const showNotifications = () => {
    alert("You have 3 notifications");
  };

  return (
    <div
      className="relative cursor-pointer"
      onClick={showNotifications}
    >
      <Bell size={22} />

      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
        3
      </span>
    </div>
  );
}