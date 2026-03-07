import React from "react";
import { motion } from "framer-motion";

const ProgressBar = ({ label, value }) => {
  return (
    <div className="progress-container">
      <div className="progress-label">
        <span>{label}</span>
        <span>{value}%</span>
      </div>

      <div className="progress-bar-bg">
        <motion.div
          className="progress-bar-fill"
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

const ScoreDashboard = ({ result }) => {
  if (!result) return null;

  return (
    <motion.div
      className="dashboard-card"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="dashboard-title">Resume Match Analysis</h2>

      <ProgressBar
        label="Final Match Score"
        value={result.final_match_percentage}
      />
      <ProgressBar
        label="Skill Match Score"
        value={result.skill_match_score}
      />
      <ProgressBar
        label="Text Similarity Score"
        value={result.text_similarity_score}
      />
    </motion.div>
  );
};

export default ScoreDashboard;