from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.services.prediction_service import predict_image
from app.schemas.prediction import PredictionResponse

router = APIRouter(
    prefix="/predictions",
    tags=["Predictions"]
)


@router.post(
    "/{image_id}",
    response_model=PredictionResponse
)
def predict(
    image_id: int,
    db: Session = Depends(get_db)
):

    try:
        return predict_image(db, image_id)

    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e)
        )