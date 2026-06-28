import { useEffect, useState } from "react";
import API from "../services/api";

function CareerDashboard() {

    const email = localStorage.getItem("email");

    const [career, setCareer] = useState(null);

    useEffect(() => {
        loadCareer();
    }, []);

    const loadCareer = async () => {

        const res = await API.post("/career_mentor", {
            email,
            target_role: "Data Scientist"
        });

        setCareer(res.data);
    };

    if (!career)
        return <div className="p-10">Loading...</div>;

   return (
  <div className="min-h-screen bg-gray-100 py-8 px-4">
    <div className="max-w-7xl mx-auto">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">
            Welcome Back 👋
          </h1>
          <p className="text-gray-500 mt-2">
            AI Career Dashboard
          </p>
        </div>

        <div className="text-center md:text-right mt-4 md:mt-0">
          <p className="text-gray-500">
            Today's Goal
          </p>
          <h2 className="text-xl font-bold text-blue-600">
            Become a Data Scientist 🚀
          </h2>
        </div>
      </div>

      {/* Score Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <h2 className="text-gray-500 text-lg">
            Resume Score
          </h2>
          <p className="text-5xl font-bold text-green-600 mt-4">
            {career.resume_score}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <h2 className="text-gray-500 text-lg">
            Placement Score
          </h2>
          <p className="text-5xl font-bold text-blue-600 mt-4">
            {career.placement_score}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <h2 className="text-gray-500 text-lg">
            Skill Gap
          </h2>
          <p className="text-5xl font-bold text-red-500 mt-4">
            {career.skill_gap_percentage}%
          </p>
        </div>

      </div>

      {/* Career Strengths */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-5">
          Career Strengths
        </h2>

        <ul className="space-y-3">
          {career.strengths.map((item, index) => (
            <li key={index}>
              ✅ {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Skills To Learn */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-5">
          Skills To Learn
        </h2>

        {career.missing_skills.length === 0 ? (
          <p className="text-green-600 font-semibold">
            🎉 No Missing Skills
          </p>
        ) : (
          <ul className="space-y-2">
            {career.missing_skills.map((skill, index) => (
              <li key={index}>
                📘 {skill}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Roadmap */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6">
          Career Roadmap
        </h2>

        <div className="space-y-5">
          {career.roadmap.map((step, index) => (
            <div key={index} className="flex items-start gap-4">

              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
                {index + 1}
              </div>

              <div className="bg-gray-100 rounded-lg p-4 flex-1">
                {step}
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Jobs */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6">
          Recommended Jobs
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {career.best_matching_live_jobs.map((job, index) => (
            <div
              key={index}
              className="border rounded-xl p-5 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-bold mb-2">
                {job.title}
              </h3>

              <p className="text-gray-600">
                {job.company}
              </p>

              <p className="text-gray-500">
                {job.location}
              </p>

              <a
                href={job.apply_link}
                target="_blank"
                rel="noreferrer"
              >
                <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg">
                  Apply
                </button>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Interview Questions */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-5">
          Interview Questions
        </h2>

        <ul className="space-y-3">
          {career.interview_questions.map((q, index) => (
            <li key={index}>
              💬 {q}
            </li>
          ))}
        </ul>
      </div>

      {/* Weekly Study Plan */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-5">
          Weekly Study Plan
        </h2>

        <ul className="space-y-3">
          {career.weekly_study_plan.map((plan, index) => (
            <li key={index}>
              📅 {plan}
            </li>
          ))}
        </ul>
      </div>

    </div>
  </div>
);
}   // closes function CareerDashboard

export default CareerDashboard;