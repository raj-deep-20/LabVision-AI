from pydantic import BaseModel, Field, ConfigDict
from typing import Literal
from datetime import date, datetime


class PatientCreate(BaseModel):

    name: str = Field(min_length=2, max_length=100)
    age: int = Field(gt=0, lt=120)
    gender: Literal["Male", "Female", "Other"]
    blood_group: Literal["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
    phone: str = Field(min_length=10, max_length=15, pattern=r"^\d{10,15}$")
    doctor: str = Field(min_length=2, max_length=100)
    visit_date: date


class PatientResponse(BaseModel):

    patient_code: str = Field(alias="patient_id")
    name: str
    age: int
    gender: str
    blood_group: str
    phone: str
    doctor: str
    visit_date: date
    created_at: datetime

    model_config = ConfigDict(from_attributes=True, populate_by_name=True)