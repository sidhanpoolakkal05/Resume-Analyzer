import { useState } from "react";
import axios from "axios";

function ResumeForm({ setResult }) {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !jobDescription) {
      alert("Please upload resume and enter job description");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("job_description", jobDescription);

    try {
      setLoading(true);

      const response = await axios.post(
        "http://127.0.0.1:8000/match-resume/",
        formData
      );

      setResult(response.data);
    } catch (error) {
      console.error(error);
      alert("Error connecting to backend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
      <div>
        <label>Upload Resume (PDF):</label>
        <br />
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      </div>

      <div style={{ marginTop: "15px" }}>
        <label>Job Description:</label>
        <br />
        <textarea
          rows="6"
          style={{ width: "100%" }}
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
      </div>

      <button
        type="submit"
        style={{
          marginTop: "15px",
          padding: "10px 20px",
          cursor: "pointer"
        }}
      >
        {loading ? "Analyzing..." : "Analyze Resume"}
      </button>
    </form>
  );
}

export default ResumeForm;