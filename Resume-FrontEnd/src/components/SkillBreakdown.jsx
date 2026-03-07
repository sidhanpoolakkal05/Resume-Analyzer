import React from "react";

const SkillsBreakdown = ({ matched, missing }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md mt-6">
      <h2 className="text-xl font-bold mb-4">Skills Breakdown</h2>

      <div className="mb-4">
        <h3 className="font-semibold text-green-600">Matched Skills</h3>
        <ul className="list-disc ml-5">
          {matched.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-semibold text-red-600">Missing Skills</h3>
        <ul className="list-disc ml-5">
          {missing.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SkillsBreakdown;