from sqlalchemy import Column, Integer, String, ForeignKey, Date, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime

from app.core.database import Base


class Sample(Base):
    __tablename__ = "samples"

    id = Column(Integer, primary_key=True, index=True)

    sample_id = Column(String(30), unique=True, nullable=False, index=True)

    patient_id = Column(
        Integer,
        ForeignKey("patients.id", ondelete="CASCADE"),
        nullable=False
    )

    sample_type = Column(String(50), nullable=False)

    status = Column(String(30), default="Pending")

    collection_date = Column(Date, nullable=False)

    remarks = Column(String(255), nullable=True)

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
     