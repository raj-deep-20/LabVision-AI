from pydantic import BaseModel, Field


class PredictionResponse(BaseModel):

    sample_code: str
    disease: str
    confidence: float = Field(ge=0.0, le=1.0)
    image_quality: str
    rbc_count: int = Field(ge=0)
    wbc_count: int = Field(ge=0)
    platelet_count: int = Field(ge=0)