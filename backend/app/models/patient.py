from sqlalchemy import Column, Integer, String, Date, DateTime
from sqlalchemy.orm import relationship
from app.core.database import Base


class Patient(Base):
    __tablename__ = "patients"

    id = Column(Integer, primary_key=True, index=True)

    patient_id = Column(String(30), unique=True, nullable=False, index=True)

    name = Column(String(100), nullable=False)

    age = Column(Integer, nullable=False)

    gender = Column(String(20), nullable=False)

    blood_group = Column(String(10), nullable=False)

    phone = Column(String(20), unique=True, nullable=False, index=True)

    doctor = Column(String(100), nullable=False)

    visit_date = Column(Date)

    samples = relationship(
        "Sample",
        back_populates="patient",
        cascade="all, delete-orphan"
    )