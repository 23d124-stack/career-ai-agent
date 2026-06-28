import { useState } from "react";
import API from "../services/api";

function Roadmap() {

  const [targetRole, setTargetRole] = useState("");
  const [roadmap, setRoadmap] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateRoadmap = async () => {

    if (!targetRole.trim()) {
      alert("Please enter a target role");
      return;
    }

    try {

      setLoading(true);

      const res = await API.post("/roadmap", {
        target_role: targetRole,
      });

      const text = res.data.roadmap;

      const lines = text
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line !== "");

      const sections = [];

      let current = null;

      lines.forEach((line) => {

        const lower = line.toLowerCase();

        if (lower.includes("beginner")) {

          current = {
            title: "🚀 Beginner Skills",
            items: [],
          };

          sections.push(current);

        }

        else if (lower.includes("intermediate")) {

          current = {
            title: "⚙ Intermediate Skills",
            items: [],
          };

          sections.push(current);

        }

        else if (lower.includes("advanced")) {

          current = {
            title: "🎯 Advanced Skills",
            items: [],
          };

          sections.push(current);

        }

        else if (lower.includes("projects")) {

          current = {
            title: "💻 Projects",
            items: [],
          };

          sections.push(current);

        }

        else if (lower.includes("certification")) {

          current = {
            title: "🏆 Certifications",
            items: [],
          };

          sections.push(current);

        }

        else if (lower.includes("resources")) {

          current = {
            title: "📚 Resources",
            items: [],
          };

          sections.push(current);

        }

        else if (lower.includes("timeline")) {

          current = {
            title: "📅 Timeline",
            items: [],
          };

          sections.push(current);

        }

        else if (current) {

          const cleanLine = line
            .replace(/^\*+/, "")
            .replace(/^-+/, "")
            .trim();

          if (cleanLine !== "") {
            current.items.push(cleanLine);
          }

        }

      });

      setRoadmap(sections);

    }

    catch (err) {

      console.log(err);

      if (err.response) {
        alert(err.response.data.detail || "Failed to generate roadmap");
      } else {
        alert("Server Error");
      }

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <div className="max-w-7xl mx-auto p-6">

      <h1 className="text-4xl font-bold text-blue-700 mb-8">
        AI Career Roadmap
      </h1>

      <div className="flex gap-4 mb-8">

        <input
          type="text"
          placeholder="Enter Target Role (Example: Data Scientist)"
          value={targetRole}
          onChange={(e) => setTargetRole(e.target.value)}
          className="flex-1 border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={generateRoadmap}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 rounded-xl font-semibold transition"
        >
          Generate
        </button>

      </div>

      {loading && (

        <div className="text-center text-blue-600 font-semibold text-lg mb-6">
          Generating AI Roadmap...
        </div>

      )}

      {roadmap.length === 0 ? (

        <div className="bg-white rounded-2xl shadow p-10 text-center text-gray-500">
          No roadmap generated yet.
        </div>

      ) : (

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">

          {roadmap.map((section, index) => (

            <div
              key={index}
              className="
              bg-white
              rounded-2xl
              shadow-lg
              border-l-4
              border-blue-600
              p-6
              hover:-translate-y-2
              hover:shadow-2xl
              transition-all
              duration-300
              "
            >

              <h2 className="text-2xl font-bold text-blue-700 mb-5">

                {section.title}

              </h2>

              <ul className="space-y-3">

                {section.items.map((item, i) => (

                  <li
                    key={i}
                    className="flex gap-3 items-start"
                  >

                    <span className="text-green-600 text-lg">
                      ✔
                    </span>

                    <span className="text-gray-700">
                      {item}
                    </span>

                  </li>

                ))}

              </ul>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}

export default Roadmap;