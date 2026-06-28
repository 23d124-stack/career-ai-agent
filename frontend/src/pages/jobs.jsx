import { useEffect, useState } from "react";
import API from "../services/api";

function Jobs() {
  const email = localStorage.getItem("email");

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("AI Engineer");

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      setLoading(true);

      const res = await API.get(
        `/live_jobs/${encodeURIComponent(role)}`
      );

      setJobs(res.data || []);
    } catch (err) {
      console.log(err);
      alert("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  const trackApplication = async (job) => {
    try {
      const res = await API.post("/apply_job", {
        email,
        company: job.company,
        role: job.title,
        apply_link: job.apply_link,
      });

      alert(res.data.message);
    } catch (err) {
      console.log(err);
      alert("Failed to track application");
    }
  };

 const autoTrackJobs = async () => {
  try {
    const res = await API.post(
      `/auto_apply?email=${email}&role=${encodeURIComponent(role)}`
    );

    alert(res.data.message);
  } catch (err) {
    console.log("ERROR:", err);
    console.log("STATUS:", err.response?.status);
    console.log("DATA:", err.response?.data);

    alert("Auto track failed");
  }
};
  return (
    <div className="p-6">

      {/* Header */}
      <div className="mb-6">

        <h1 className="text-3xl font-bold">
          Live Jobs
        </h1>

        <div className="flex gap-3 mt-4">

          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="AI Engineer, Data Scientist..."
            className="border p-3 rounded-lg w-80"
          />

          <button
            onClick={loadJobs}
            className="bg-blue-600 text-white px-5 rounded-lg"
          >
            Search Jobs
          </button>

          <button
            onClick={autoTrackJobs}
            className="bg-purple-600 text-white px-5 rounded-lg"
          >
            Auto Track Top 5
          </button>

        </div>

        <p className="mt-4 font-semibold">
          Total Jobs: {jobs.length}
        </p>

      </div>

      {loading ? (
        <div className="bg-white p-6 rounded-xl shadow">
          Loading jobs...
        </div>
      ) : jobs.length === 0 ? (
        <div className="bg-white p-6 rounded-xl shadow">
          No jobs found
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {jobs.map((job, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow p-5 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-bold mb-2">
                {job.title}
              </h2>

              <p className="text-gray-700">
                🏢 {job.company}
              </p>

              <p className="text-gray-500 mb-4">
                📍 {job.location}
              </p>

              <a
                href={job.apply_link}
                target="_blank"
                rel="noreferrer"
              >
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg mb-2">
                  Apply Now
                </button>
              </a>

              <button
                onClick={() => trackApplication(job)}
                className="w-full bg-green-600 text-white py-2 rounded-lg"
              >
                Track Application
              </button>

            </div>
          ))}

        </div>
      )}
    </div>
  );
}

export default Jobs;