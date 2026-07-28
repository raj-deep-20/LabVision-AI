from fastapi import FastAPI
from app.api.auth import router as auth_router
from app.core.database import Base, engine
import app.models
from app.api.samples import router as sample_router
from app.api.patients import router as patient_router
from app.api.images import router as image_router
print("Creating tables...")
Base.metadata.create_all(bind=engine)
print("Tables created!")

app = FastAPI(
    title="LabVision AI",
)

@app.get("/")
def home():
    return {"message": "LabVision AI Running"}

app.include_router(auth_router)
app.include_router(sample_router)
app.include_router(patient_router)
app.include_router(image_router)