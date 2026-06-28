import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    skill: "Python",
    value: 90,
  },
  {
    skill: "Machine Learning",
    value: 80,
  },
  {
    skill: "Deep Learning",
    value: 75,
  },
  {
    skill: "SQL",
    value: 70,
  },
  {
    skill: "React",
    value: 65,
  },
  {
    skill: "Communication",
    value: 85,
  },
];

function SkillChart() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-bold">
          💪 Skill Analysis
        </h2>

        <span className="text-sm text-gray-500">
          AI Generated
        </span>
      </div>

      <div className="h-80">

        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>

            <PolarGrid />

            <PolarAngleAxis dataKey="skill" />

            <PolarRadiusAxis angle={30} domain={[0, 100]} />

            <Radar
              name="Skills"
              dataKey="value"
              stroke="#2563eb"
              fill="#2563eb"
              fillOpacity={0.6}
            />

          </RadarChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default SkillChart;