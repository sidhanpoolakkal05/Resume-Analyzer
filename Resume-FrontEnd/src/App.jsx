import ResumeForm from "./components/ResumeForm";
import ResultCard from "./components/ResultCard";
import { useState } from "react";
import "./index.css"
import FeedbackCard from "./components/FeedbackCard"; 
import ScoreDashboard from "./components/ScoreDashboard";
import SkillVisualizer from "./components/SkillVisualizer";
import SkillChart from "./components/SkillChart";

function App() {
  const [result, setResult] = useState(null);

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>AI Resume Analyzer</h1>
      <ResumeForm setResult={setResult} />
      {result && (
        <>
          <ScoreDashboard result={result} />
          <SkillVisualizer
            matchedSkills={result.matched_skills}
            missingSkills={result.missing_skills}
          />
          {/* <SkillChart
            matched={result.matched_skills}
            missing={result.missing_skills}
          />

           <SkillsBreakdown
              matched={result.matched_skills}
              missing={result.missing_skills}
           /> */}

          <FeedbackCard feedback={result.feedback} />
        </>
      )}

    </div>
  );
}

export default App;

// ---------------------------------------------------------------------------------------------------

