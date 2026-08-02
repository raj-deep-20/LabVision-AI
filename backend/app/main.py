from fastapi import FastAPI
from app.api.auth import router as auth_router
from app.core.database import Base, engine
import app.models
from fastapi.middleware.cors import CORSMiddleware
from app.api import predictions
from app.api.samples import router as sample_router
from app.api.patients import router as patient_router
from app.api.images import router as image_router
from app.api import reports

print("Creating tables...")
Base.metadata.create_all(bind=engine)
print("Tables created!")

app = FastAPI(
    title="LabVision AI",
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://lab-vision-ai.vercel.app/"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "LabVision AI Running"}

app.include_router(auth_router)
app.include_router(sample_router)
app.include_router(patient_router)
app.include_router(image_router)
app.include_router(predictions.router)
app.include_router(reports.router)