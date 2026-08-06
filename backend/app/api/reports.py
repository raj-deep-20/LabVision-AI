from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.user import User
from app.services.report_service import generate_report

router = APIRouter(
    prefix="/reports",
    tags=["Reports"]
)


@router.get("/{sample_code}")
def download_report(
    sample_code: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    try:
        pdf_path = generate_report(db, sample_code)

        return FileResponse(
            path=pdf_path,
            filename=f"LabVision_Report_{sample_code}.pdf",
            media_type="application/pdf"
        )

    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e)
        )