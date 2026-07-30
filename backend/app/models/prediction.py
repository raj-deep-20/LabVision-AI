from sqlalchemy import Column, Integer, Float, String, ForeignKey
from sqlalchemy.orm import relationship

from app.core.database import Base


class Prediction(Base):

    __tablename__ = "predictions"

    id = Column(Integer, primary_key=True)

    image_id = Column(
        Integer,
        ForeignKey("images.id"),
        unique=True
    )

    disease = Column(String(100), nullable=False)

    confidence = Column(Float, nullable=False)

    image_quality = Column(String(50))

    rbc_count = Column(Integer)

    wbc_count = Column(Integer)

    platelet_count = Column(Integer)

    image = relationship(
        "Image",
        back_populates="prediction",
        uselist=False
    )

    report = relationship(
        "Report",
        back_populates="prediction",
        uselist=False,
        cascade="all, delete-orphan"
    )