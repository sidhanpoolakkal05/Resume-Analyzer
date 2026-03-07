function ResultCard({ result }) {
  if (!result) return null;

  const matchedSkills = result.matched_skills || [];
  const missingSkills = result.missing_skills || [];

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        marginTop: "20px"
      }}
    >
      <h2>Analysis Result</h2>

      <p>
        <strong>Final Match Percentage:</strong>{" "}
        {result.final_match_percentage || 0}%
      </p>

      <p>
        <strong>Skill Match Score:</strong>{" "}
        {result.skill_match_score || 0}%
      </p>

      <p>
        <strong>Text Similarity Score:</strong>{" "}
        {result.text_similarity_score || 0}%
      </p>

      <h3>Matched Skills</h3>
      <ul>
        {matchedSkills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>

      <h3>Missing Skills</h3>
      <ul>
        {missingSkills.map((skill, index) => (
          <li key={index} style={{ color: "red" }}>
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ResultCard;