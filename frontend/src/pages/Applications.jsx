import { useEffect, useState } from "react";
import API from "../services/api";

function Applications() {
  const email = localStorage.getItem("email");

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (email) {
      loadApplications();
    } else {
      alert("Please login first.");
      setLoading(false);
    }
  }, []);

  const loadApplications = async () => {
    try {
      setLoading(true);

      const res = await API.get(`/user_applications/${email}`);

      console.log("Applications:", res.data);

      if (Array.isArray(res.data)) {
        setApplications(res.data);
      } else {
        setApplications([]);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to load applications.");
    } finally {
      setLoading(false);
    }
  };

  const deleteApplication = async (id) => {
    try {
      await API.delete(`/applications/${id}`);

      setApplications((prev) =>
        prev.filter((app) => app.id !== id)
      );

      alert("Application deleted successfully.");
    } catch (err) {
      console.error(err);
      alert("Delete failed.");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Selected":
        return "bg-green-100 text-green-700";

      case "Rejected":
        return "bg-red-100 text-red-700";

      case "Interview":
        return "bg-yellow-100 text-yellow-700";

      case "Pending":
        return "bg-blue-100 text-blue-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-xl shadow p-6">
          Loading applications...
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">

      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          Application Tracker
        </h1>

        <p className="text-gray-500 mt-2">
          Total Applications: {applications.length}
        </p>
      </div>

      {applications.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-6 text-center">
          No Applications Found
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left">Company</th>
                <th className="p-4 text-left">Role</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Job Link</th>
                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>

            <tbody>

              {applications.map((app) => (
                <tr
                  key={app.id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="p-4">{app.company}</td>

                  <td className="p-4">{app.role}</td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(app.status)}`}
                    >
                      {app.status}
                    </span>
                  </td>

                  <td className="p-4">
                    <a
                      href={app.apply_link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded">
                        Open
                      </button>
                    </a>
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() => deleteApplication(app.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

            </tbody>

          </table>

        </div>
      )}
    </div>
  );
}

export default Applications;