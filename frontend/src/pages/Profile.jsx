import { useEffect, useState } from "react";
import API from "../services/api";

function Profile() {
  const email = localStorage.getItem("email");

  const [formData, setFormData] = useState({
    email: email || "",
    degree: "",
    college: "",
    graduation_year: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get(`/profile/${email}`);

      setFormData({
        email: res.data.email || email,
        degree: res.data.degree || "",
        college: res.data.college || "",
        graduation_year: res.data.graduation_year || "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      const res = await API.put(`/profile/${email}`, {
        degree: formData.degree,
        college: formData.college,
        graduation_year: formData.graduation_year,
      });

      alert(res.data.message);
    } catch (err) {
      console.log(err);
      alert("Profile Update Failed");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow">
      <h1 className="text-3xl font-bold mb-6">
        My Profile
      </h1>

      <div className="grid gap-5">

        {/* Email */}
        <div>
          <label className="block mb-2 font-semibold">
            Email
          </label>

          <input
            type="email"
            value={formData.email}
            disabled
            className="w-full border p-3 rounded bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Degree */}
        <div>
          <label className="block mb-2 font-semibold">
            Degree
          </label>

          <input
            type="text"
            name="degree"
            value={formData.degree}
            onChange={handleChange}
            placeholder="B.Tech AI & DS"
            className="w-full border p-3 rounded"
          />
        </div>

        {/* College */}
        <div>
          <label className="block mb-2 font-semibold">
            College
          </label>

          <input
            type="text"
            name="college"
            value={formData.college}
            onChange={handleChange}
            placeholder="PSG iTech"
            className="w-full border p-3 rounded"
          />
        </div>

        {/* Graduation Year */}
        <div>
          <label className="block mb-2 font-semibold">
            Graduation Year
          </label>

          <input
            type="text"
            name="graduation_year"
            value={formData.graduation_year}
            onChange={handleChange}
            placeholder="2027"
            className="w-full border p-3 rounded"
          />
        </div>

        <button
          onClick={handleSave}
          className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Save Profile
        </button>

      </div>
    </div>
  );
}

export default Profile;