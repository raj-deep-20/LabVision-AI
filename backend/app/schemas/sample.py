from datetime import date
from typing import Optional

from pydantic import BaseModel, Field


class SampleCreate(BaseModel):

    patient_id: int

    sample_type: str = Field(min_length=2, max_length=50)

    collection_date: date

    remarks: Optional[str] = None


class SampleUpdate(BaseModel):

    sample_type: Optional[str] = None

    status: Optional[str] = None

    collection_date: Optional[date] = None

    remarks: Optional[str] = None


class SampleResponse(BaseModel):

    id: int

    sample_id: str

    patient_id: int

    sample_type: str

    status: str

    collection_date: date

    remarks: Optional[str]

    class Config:
        from_attributes = True