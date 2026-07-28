from fastapi import APIRouter, Depends, UploadFile, File
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.schemas.image import ImageResponse
from app.services.image_service import upload_image

router = APIRouter(
    prefix="/images",
    tags=["Images"]
)


@router.post("/upload/{sample_id}", response_model=ImageResponse)
def upload(
    sample_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    return upload_image(db, sample_id, file)