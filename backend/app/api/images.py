from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.user import User
from app.schemas.image import ImageResponse
from app.services.image_service import upload_image

router = APIRouter(
    prefix="/images",
    tags=["Images"]
)


@router.post("/upload/{sample_code}", response_model=ImageResponse)
def upload(
    sample_code: str,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    try:
        return upload_image(db, sample_code, file)

    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e)
        )