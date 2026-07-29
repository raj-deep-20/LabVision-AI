from pydantic import BaseModel


class PredictionResponse(BaseModel):
    id: int
    image_id: int
    prediction_label: str
    confidence: float

    class Config:
        from_attributes = True