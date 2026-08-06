from datetime import date, datetime
from typing import Optional, Literal

from pydantic import BaseModel, Field, ConfigDict, model_validator


class SampleCreate(BaseModel):

    patient_code: str = Field(pattern=r"^PAT\d{6}$")

    sample_type: Literal["Blood Smear", "Urine", "Tissue", "CSF", "Other"]

    collection_date: date

    remarks: Optional[str] = Field(None, max_length=255)


class SampleUpdate(BaseModel):

    sample_type: Optional[Literal["Blood Smear", "Urine", "Tissue", "CSF", "Other"]] = None

    status: Optional[Literal["Pending", "Processing", "Completed"]] = None

    collection_date: Optional[date] = None

    remarks: Optional[str] = Field(None, max_length=255)


class SampleResponse(BaseModel):

    sample_code: str
    patient_code: str
    sample_type: str
    status: str
    collection_date: date
    remarks: Optional[str]
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

    @model_validator(mode='before')
    @classmethod
    def resolve_codes(cls, values):
        if not isinstance(values, dict):
            return {
                'sample_code': values.sample_id,
                'patient_code': values.patient.patient_id if values.patient else None,
                'sample_type': values.sample_type,
                'status': values.status,
                'collection_date': values.collection_date,
                'remarks': values.remarks,
                'created_at': values.created_at,
            }
        return values