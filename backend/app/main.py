import os
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware

from app.api.auth import router as auth_router
from app.core.database import Base, engine
import app.models
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
        "https://lab-vision-ai.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Paths for serving the React frontend
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FRONTEND_DIST_DIR = os.path.abspath(os.path.join(BASE_DIR, "..", "frontend", "dist"))

@app.get("/")
def home():
    index_path = os.path.join(FRONTEND_DIST_DIR, "index.html")
    if os.path.exists(index_path):
        return FileResponse(index_path)
    return {"message": "LabVision AI Running"}

app.include_router(auth_router)
app.include_router(sample_router)
app.include_router(patient_router)
app.include_router(image_router)
app.include_router(predictions.router)
app.include_router(reports.router)

# Mount and serve frontend static files if built
if os.path.exists(FRONTEND_DIST_DIR):
    assets_dir = os.path.join(FRONTEND_DIST_DIR, "assets")
    if os.path.exists(assets_dir):
        app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")

    @app.get("/{path_name:path}")
    def serve_frontend(path_name: str):
        # Exclude backend routes from being hijacked by the catch-all route
        first_segment = path_name.split("/")[0]
        if first_segment in ["auth", "samples", "patients", "images", "predictions", "reports"]:
            return {"detail": "Not Found"}

        file_path = os.path.join(FRONTEND_DIST_DIR, path_name)
        if os.path.isfile(file_path):
            return FileResponse(file_path)

        index_path = os.path.join(FRONTEND_DIST_DIR, "index.html")
        if os.path.exists(index_path):
            return FileResponse(index_path)

        return {"detail": "Not Found"}