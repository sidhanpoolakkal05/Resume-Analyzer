import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const SkillChart = ({ matched, missing }) => {

  const data = [
    { name: "Matched Skills", value: matched.length },
    { name: "Missing Skills", value: missing.length }
  ];

  const COLORS = ["#22c55e", "#ef4444"];

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mt-6">
      <h2 className="text-xl font-bold mb-4">Skill Distribution</h2>

      <PieChart width={400} height={300}>
        <Pie
          data={data}
          cx={200}
          cy={150}
          labelLine={false}
          label
          outerRadius={100}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>

        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default SkillChart;