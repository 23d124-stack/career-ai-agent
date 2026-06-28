import { useEffect, useState } from "react";
import API from "../services/api";

function Preferences() {
  const email = localStorage.getItem("email");

  const [preferences, setPreferences] = useState({
    preferred_company: "",
    preferred_domain: "",
    preferred_location: "",
    job_type: "",
  });

  useEffect(() => {
    fetchPreferences();
  }, []);

  const fetchPreferences = async () => {
    try {
      const res = await API.get(
        `/preferences/${email}`
      );

      setPreferences(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setPreferences({
      ...preferences,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
  try {

    const res = await API.post(
      "/preferences",
      {
        email,
        preferred_company:
          preferences.preferred_company,

        preferred_domain:
          preferences.preferred_domain,

        preferred_location:
          preferences.preferred_location,

        job_type:
          preferences.job_type,
      }
    );

    alert(res.data.message);

  } catch (err) {
    console.log(err);

    console.log(
      err.response?.data
    );

    alert("Update Failed");
  }
};

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow">
      <h1 className="text-3xl font-bold mb-6">
        Career Preferences
      </h1>

      <div className="space-y-4">

        <input
          type="text"
          name="preferred_company"
          placeholder="Preferred Company"
          value={preferences.preferred_company}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="preferred_domain"
          placeholder="Preferred Domain"
          value={preferences.preferred_domain}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="preferred_location"
          placeholder="Preferred Location"
          value={preferences.preferred_location}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <select
          name="job_type"
          value={preferences.job_type}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        >
          <option value="">
            Select Job Type
          </option>

          <option value="Full-Time">
            Full-Time
          </option>

          <option value="Internship">
            Internship
          </option>

          <option value="Remote">
            Remote
          </option>
        </select>

        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Save Preferences
        </button>

      </div>
    </div>
  );
}

export default Preferences;