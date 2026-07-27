from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime

from app.core.database import Base


class Sample(Base):
    __tablename__ = "samples"

    id = Column(Integer, primary_key=True)

    patient_id = Column(
        Integer,
        ForeignKey("patients.id", ondelete="CASCADE")
    )

    sample_type = Column(String(50))

    status = Column(String(50))

    created_at = Column(DateTime, default=datetime.utcnow)

    patient = relationship(
        "Patient",
        back_populates="samples"
    )

    images = relationship(
        "Image",
        back_populates="sample",
        cascade="all, delete-orphan"
    )