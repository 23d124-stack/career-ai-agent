import { useState } from "react";
import API from "../services/api";

function Mentor() {
  const email = localStorage.getItem("email");

  const [targetRole, setTargetRole] = useState("AI Engineer");
  const [loading, setLoading] = useState(false);
  const [mentorData, setMentorData] = useState(null);

  const getAdvice = async () => {
    try {
      setLoading(true);

      const res = await API.post("/career_mentor", {
        email,
        target_role: targetRole,
      });

      setMentorData(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to get mentor advice");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">

      {/* Header */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h1 className="text-3xl font-bold mb-5">
          🤖 AI Career Mentor
        </h1>

        <div className="flex gap-4">
          <input
            type="text"
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            placeholder="Target Role"
            className="flex-1 border rounded-lg p-3"
          />

          <button
            onClick={getAdvice}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-lg"
          >
            {loading ? "Analyzing..." : "Get Advice"}
          </button>
        </div>
      </div>

      {mentorData && (
        <>

          {/* Score Cards */}
          <div className="grid md:grid-cols-3 gap-5 mb-6">

            <div className="bg-white rounded-xl shadow p-6 text-center">
              <h3 className="text-gray-500 font-semibold">
                📊 Resume Score
              </h3>

              <p className="text-5xl font-bold text-blue-600 mt-4">
                {mentorData.resume_score}%
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6 text-center">
              <h3 className="text-gray-500 font-semibold">
                🤖 ATS Score
              </h3>

              <p className="text-5xl font-bold text-green-600 mt-4">
                {mentorData.ats_score}%
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6 text-center">
              <h3 className="text-gray-500 font-semibold">
                🎯 Placement Score
              </h3>

              <p className="text-5xl font-bold text-purple-600 mt-4">
                {mentorData.placement_score}%
              </p>
            </div>

          </div>

          {/* Strengths */}
          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">
              💪 Strengths
            </h2>

            <ul className="space-y-3">
              {mentorData.strengths?.map((item, index) => (
                <li key={index}>
                  ✅ {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Missing Skills */}
          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">
              📚 Skills to Learn
            </h2>

            <div className="flex flex-wrap gap-3">

              {mentorData.missing_skills?.length > 0 ? (
                mentorData.missing_skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-green-600 font-semibold">
                  🎉 No Missing Skills
                </span>
              )}

            </div>
          </div>

          {/* Learning Roadmap */}
          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">
              🛣️ Learning Roadmap
            </h2>

            <ol className="list-decimal ml-6 space-y-2">
              {mentorData.roadmap?.map((step, index) => (
                <li key={index}>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          {/* Recommended Jobs */}
          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">
              💼 Recommended Jobs
            </h2>

            <div className="flex flex-wrap gap-3">
              {mentorData.recommended_jobs?.map((job, index) => (
                <span
                  key={index}
                  className="bg-green-100 text-green-700 px-4 py-2 rounded-full"
                >
                  {job}
                </span>
              ))}
            </div>
          </div>

          {/* Live Jobs */}
          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">
              🌐 Best Matching Live Jobs
            </h2>

            <div className="grid md:grid-cols-2 gap-5">

              {mentorData.best_matching_live_jobs?.map((job, index) => (

                <div
                  key={index}
                  className="border rounded-xl p-5 hover:shadow-lg"
                >

                  <h3 className="text-xl font-bold">
                    {job.title}
                  </h3>

                  <p className="mt-2">
                    🏢 {job.company}
                  </p>

                  <p className="text-gray-500">
                    📍 {job.location}
                  </p>

                  <a
                    href={job.apply_link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg">
                      Apply Now
                    </button>
                  </a>

                </div>

              ))}

            </div>
          </div>

          {/* Weekly Study Plan */}
<div className="bg-white rounded-xl shadow p-6 mb-6">
  <h2 className="text-2xl font-bold mb-4">
    📅 Weekly Study Plan
  </h2>

  <div className="space-y-3">
    {mentorData.weekly_study_plan?.map((plan, index) => (
      <div
        key={index}
        className="border rounded-lg p-4 shadow-sm"
      >
        <p className="font-bold text-blue-600">
          📅 {plan.day}
        </p>

        <p className="mt-1">
          📖 {plan.topic}
        </p>

        <p className="text-green-600">
          🔗 {plan.resource}
        </p>
      </div>
    ))}
  </div>
</div>

          {/* Weekly Reminders */}
          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">
              🔔 Weekly Reminders
            </h2>

            <ul className="space-y-3">
              {mentorData.weekly_reminders?.map((item, index) => (
                <li key={index}>
                  ✅ {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Interview Questions */}
          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">
              ❓ Interview Questions
            </h2>

            <ul className="space-y-3">
              {mentorData.interview_questions?.map((question, index) => (
                <li key={index}>
                  🎤 {question}
                </li>
              ))}
            </ul>
          </div>

          {/* Auto Apply Recommendation */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-2xl font-bold mb-4">
              🚀 Auto Apply Recommendation
            </h2>

            {mentorData.auto_apply_recommended ? (
              <div className="bg-green-100 text-green-700 p-4 rounded-lg font-semibold">
                ✅ Based on your profile, Auto Apply is recommended.
              </div>
            ) : (
              <div className="bg-yellow-100 text-yellow-700 p-4 rounded-lg font-semibold">
                ⚠ Improve your profile before enabling Auto Apply.
              </div>
            )}
          </div>

        </>
      )}

    </div>
  );
}

export default Mentor;