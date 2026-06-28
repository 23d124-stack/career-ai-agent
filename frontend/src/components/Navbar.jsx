export default function Navbar() {
  return (
    <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">
        CareerPilot AI Dashboard
      </h1>

      <button
        onClick={() => {
          localStorage.removeItem("email");
          window.location.href = "/login";
        }}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}