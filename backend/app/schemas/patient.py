from pydantic import BaseModel, Field
from datetime import date

class PatientCreate(BaseModel):

    name: str = Field(min_length=2, max_length=100)

    age: int = Field(gt=0, lt=120)

    gender: str

    blood_group: str

    phone: str = Field(min_length=10, max_length=15)

    doctor: str

    visit_date: date
    
class PatientResponse(BaseModel):
    id: int
    patient_id: str

    name: str
    age: int
    gender: str
    blood_group: str
    phone: str
    doctor: str
    visit_date: date

    class Config:
        from_attributes = True