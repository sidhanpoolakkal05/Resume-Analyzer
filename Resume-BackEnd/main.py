from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pdfminer.high_level import extract_text
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from skills import SKILLS
import shutil
import re
import os

app = FastAPI()

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "AI Resume Analyzer is running!"}


# ----------------------------
# Text Cleaning
# ----------------------------
def clean_text(text: str) -> str:
    text = text.lower()
    text = re.sub(r'\s+', ' ', text)
    text = re.sub(r'[^a-zA-Z0-9@., ]', '', text)
    return text.strip()


# ----------------------------
# Skill Extraction
# ----------------------------
def extract_skills(text: str):
    found_skills = []
    for skill in SKILLS:
        if skill.lower() in text:
            found_skills.append(skill.lower())
    return list(set(found_skills))


# ----------------------------
# Upload Resume Endpoint
# ----------------------------
@app.post("/upload-resume/")
async def upload_resume(file: UploadFile = File(...)):

    temp_path = "temp_resume.pdf"

    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    raw_text = extract_text(temp_path)
    cleaned_text = clean_text(raw_text)

    skills = extract_skills(cleaned_text)

    os.remove(temp_path)

    return {
        "filename": file.filename,
        "extracted_skills": skills,
        "text_preview": cleaned_text[:300]
    }


# ----------------------------
# Match Resume Endpoint
# ----------------------------
@app.post("/match-resume/")
async def match_resume(
    file: UploadFile = File(...),
    job_description: str = Form(...)
):

    temp_path = "temp_resume.pdf"

    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    raw_resume = extract_text(temp_path)

    cleaned_resume = clean_text(raw_resume)
    cleaned_job = clean_text(job_description)

    os.remove(temp_path)

    # ----------------------------
    # Skill Matching
    # ----------------------------
    resume_skills = extract_skills(cleaned_resume)
    job_skills = extract_skills(cleaned_job)

    matched_skills = list(set(resume_skills) & set(job_skills))
    missing_skills = list(set(job_skills) - set(resume_skills))

    if len(job_skills) > 0:
        skill_match_score = round((len(matched_skills) / len(job_skills)) * 100, 2)
    else:
        skill_match_score = 0

    # ----------------------------
    # Full Text Similarity (TF-IDF)
    # ----------------------------
    documents = [cleaned_resume, cleaned_job]

    vectorizer = TfidfVectorizer(stop_words="english")
    tfidf_matrix = vectorizer.fit_transform(documents)

    similarity = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])
    text_similarity_score = round(float(similarity[0][0]) * 100, 2)

    # ----------------------------
    # Final Weighted Score
    # ----------------------------
    final_score = round(
        (0.6 * skill_match_score) + (0.4 * text_similarity_score),
        2
    )

    feedback = generate_feedback(
    skill_match_score,
    text_similarity_score,
    missing_skills
)

    return {
    "final_match_percentage": final_score,
    "skill_match_score": skill_match_score,
    "text_similarity_score": text_similarity_score,
    "matched_skills": matched_skills,
    "missing_skills": missing_skills,
    "feedback": feedback
}

def generate_feedback(skill_score, text_score, missing_skills):
    
    feedback = {}

    # Strength analysis
    if skill_score >= 75:
        feedback["strengths"] = "Your resume matches most required technical skills."
    elif skill_score >= 50:
        feedback["strengths"] = "You have a moderate skill alignment with the job role."
    else:
        feedback["strengths"] = "Your technical skill alignment is currently low."

    # Text similarity analysis
    if text_score < 40:
        feedback["improvements"] = "Your resume content is not well aligned with the job description. Try tailoring your experience descriptions to match job keywords."
    else:
        feedback["improvements"] = "Your resume content is fairly aligned, but can still be improved with stronger keyword optimization."

    # Missing skills suggestions
    if missing_skills:
        feedback["recommendations"] = f"Consider adding or learning the following skills: {', '.join(missing_skills)}"
    else:
        feedback["recommendations"] = "Great! You cover all required job skills."

    return feedback