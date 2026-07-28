import os
import shutil

from fastapi import UploadFile
from sqlalchemy.orm import Session

from app.models.image import Image
from app.models.sample import Sample

UPLOAD_FOLDER = "uploads"


def upload_image(
    db: Session,
    sample_id: int,
    file: UploadFile
):

    sample = (
        db.query(Sample)
        .filter(Sample.id == sample_id)
        .first()
    )

    if not sample:
        raise ValueError("Sample not found.")

    os.makedirs(UPLOAD_FOLDER, exist_ok=True)

    file_path = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    image = Image(
        sample_id=sample_id,
        image_name=file.filename,
        image_path=file_path
    )

    db.add(image)
    db.commit()
    db.refresh(image)

    return image