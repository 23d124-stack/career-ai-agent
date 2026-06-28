import { useState } from "react";
import API from "../services/api";

function ResumeUpload({ email, setResumeData }) {

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadResume = async () => {

    if (!file) {
      alert("Select a PDF");
      return;
    }

    const formData = new FormData();

    formData.append("email", email);
    formData.append("file", file);

    try {

      setLoading(true);

      const res = await API.post(
        "/upload_resume",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data"
          }
        }
      );

      setResumeData(res.data);

      alert("Resume Uploaded");

    } catch (err) {
      console.log(err);
      alert("Upload Failed");
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="text-xl font-bold mb-4">
        Upload Resume
      </h2>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) =>
          setFile(e.target.files[0])
        }
      />

      <button
        onClick={uploadResume}
        className="bg-blue-600 text-white px-5 py-2 rounded mt-4"
      >
        {loading
          ? "Uploading..."
          : "Upload Resume"}
      </button>

    </div>
  );
}

export default ResumeUpload;