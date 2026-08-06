from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.user import User
from app.services.prediction_service import predict_image
from app.schemas.prediction import PredictionResponse

router = APIRouter(
    prefix="/predictions",
    tags=["Predictions"]
)


@router.post(
    "/{sample_code}",
    response_model=PredictionResponse
)
def predict(
    sample_code: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    try:
        return predict_image(db, sample_code)

    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e)
        )