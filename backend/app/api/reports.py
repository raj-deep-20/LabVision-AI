from fastapi import APIRouter
from fastapi import Depends
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.services.report_service import generate_report

router = APIRouter(
    prefix="/reports",
    tags=["Reports"]
)

@router.get("/{prediction_id}")
def download_report(
    prediction_id: int,
    db: Session = Depends(get_db)
):

    pdf_path = generate_report(db, prediction_id)

    return FileResponse(
        path=pdf_path,
        filename=f"LabVision_Report_{prediction_id}.pdf",
        media_type="application/pdf"
    )