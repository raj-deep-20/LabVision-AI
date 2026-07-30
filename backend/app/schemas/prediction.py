from pydantic import BaseModel


class PredictionResponse(BaseModel):

    id: int

    image_id: int

    disease: str

    confidence: float

    image_quality: str

    rbc_count: int

    wbc_count: int

    platelet_count: int

    class Config:
        from_attributes = True