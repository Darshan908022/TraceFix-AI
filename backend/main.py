from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {"message": "TraceFix AI Backend Running"}
