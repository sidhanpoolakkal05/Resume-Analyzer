import React from "react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: { opacity: 1, scale: 1 },
};

const SkillChip = ({ skill, type }) => {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.1 }}
      className={`skill-chip ${type}`}
    >
      {skill}
    </motion.div>
  );
};

const SkillVisualizer = ({ matchedSkills = [], missingSkills = [] }) => {
  return (
    <div className="skill-card">
      <h2 className="skill-title">Skill Analysis</h2>

      <h3 className="skill-subtitle matched-text">Matched Skills</h3>
      <motion.div
        className="skill-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {matchedSkills.length > 0 ? (
          matchedSkills.map((skill, index) => (
            <SkillChip key={index} skill={skill} type="matched" />
          ))
        ) : (
          <p>No matched skills</p>
        )}
      </motion.div>

      <h3 className="skill-subtitle missing-text">Missing Skills</h3>
      <motion.div
        className="skill-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {missingSkills.length > 0 ? (
          missingSkills.map((skill, index) => (
            <SkillChip key={index} skill={skill} type="missing" />
          ))
        ) : (
          <p>No missing skills 🎉</p>
        )}
      </motion.div>
    </div>
  );
};

export default SkillVisualizer;