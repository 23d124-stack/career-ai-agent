import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/login", {
        email,
        password,
      });

      console.log(res.data);

      if (res.data.message === "Login Success") {
        localStorage.setItem("email", email);

        alert("Login Successful");

        console.log("Navigating...");
        window.location.href = "/dashboard";
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log("ERROR:", error.response?.data);

      alert(
        error.response?.data?.message ||
          error.message ||
          "Login Failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h1 className="text-3xl font-bold mb-6">
          Login
        </h1>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="border p-2 w-full mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="border p-2 w-full mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="bg-blue-600 text-white p-2 w-full rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;