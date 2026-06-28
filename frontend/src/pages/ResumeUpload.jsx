import { useState } from "react";
import API from "../services/api";

function ResumeUpload() {
  const email = localStorage.getItem("email");
  const [file, setFile] = useState(null);

  const uploadResume = async () => {
    if (!file) {
      alert("Please select a PDF file");
      return;
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("file", file);

    try {
      const res = await API.post("/upload_resume", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(res.data);
      alert("Resume analyzed successfully");
    } catch (err) {
      console.log(err);
      alert("Resume upload failed");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h1 className="text-3xl font-bold mb-6">
        Resume Analyzer
      </h1>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        onClick={uploadResume}
        className="ml-4 bg-blue-600 text-white px-5 py-2 rounded"
      >
        Upload Resume
      </button>
    </div>
  );
}

export default ResumeUpload;