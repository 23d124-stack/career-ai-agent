import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ResumeUpload from "./pages/ResumeUpload";
import Preferences from "./pages/Preferences";
import Jobs from "./pages/Jobs";
import Applications from "./pages/Applications";
import Mentor from "./pages/Mentor";
import Roadmap from "./pages/Roadmap";
import Chat from "./pages/Chat";
import Reminders from "./pages/Reminders";

function App() {
  return (
    <Routes>
      {/* First page */}
      <Route path="/" element={<Navigate to="/register" replace />} />

      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/resume" element={<ResumeUpload />} />
        <Route path="/preferences" element={<Preferences />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/mentor" element={<Mentor />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/reminders" element={<Reminders />} />
      </Route>
    </Routes>
  );
}

export default App;