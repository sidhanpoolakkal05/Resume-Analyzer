import React from "react";

const FeedbackCard = ({ feedback }) => {
  if (!feedback) return null;

  return (
    <div className="feedback-card">
      <h2 className="feedback-title">AI Resume Feedback</h2>

      <div className="feedback-section">
        <h3>💪 Strength</h3>
        <p>{feedback.strengths}</p>
      </div>

      <div className="feedback-section">
        <h3>⚠ Improvements</h3>
        <p>{feedback.improvements}</p>
      </div>

      <div className="feedback-section">
        <h3>🚀 Recommendations</h3>
        <p>{feedback.recommendations}</p>
      </div>
    </div>
  );
};

export default FeedbackCard;