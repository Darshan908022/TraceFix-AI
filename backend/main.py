from github_service import create_remediation_pr
import os
import json
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables
load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
if api_key:
    genai.configure(api_key=api_key)

app = FastAPI(title="TraceFix AI Backend")

# Enable CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class LogAnalysisRequest(BaseModel):
    logs: str

class LogAnalysisResponse(BaseModel):
    root_cause: str
    affected_files: list[str]
    suggested_fix: str
    severity_score: int
    estimated_downtime_cost: str

@app.get("/")
def home():
    return {"message": "TraceFix AI Backend Running"}

@app.post("/analyze-log", response_model=LogAnalysisResponse)
async def analyze_log(request: LogAnalysisRequest):
    if not api_key:
        raise HTTPException(status_code=500, detail="GEMINI_API_KEY is missing in backend environment.")

    prompt = f"""
    You are an expert DevOps and SRE engineer. Analyze the following backend logs/stack trace and provide a structured JSON response.

    LOGS:
    {request.logs}

    Respond ONLY in valid raw JSON matching this format (no markdown formatting, no extra commentary):
    {{
        "root_cause": "A concise explanation of why the crash occurred",
        "affected_files": ["path/to/file1.py", "path/to/file2.py"],
        "suggested_fix": "Exact code or configuration fix needed",
        "severity_score": 85,
        "estimated_downtime_cost": "$150/hour"
    }}
    """

    try:
        model = genai.GenerativeModel("gemini-flash-latest")
        response = model.generate_content(prompt)
        
        cleaned_text = response.text.strip().removeprefix("```json").removeprefix("```").removesuffix("```").strip()
        parsed_json = json.loads(cleaned_text)
        return parsed_json

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI Analysis Failed: {str(e)}")

@app.post("/trigger-remediation")
async def trigger_remediation(analysis: dict):
    try:
        pr_url = create_remediation_pr(analysis)
        return {
            "status": "success",
            "message": "Automated Remediation Pull Request created successfully!",
            "pull_request_url": pr_url
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"GitHub PR Creation Failed: {str(e)}")