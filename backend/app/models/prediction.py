from sqlalchemy import Column, Integer, Float, String, ForeignKey
from sqlalchemy.orm import relationship

from app.core.database import Base


class Prediction(Base):

    __tablename__ = "predictions"

    id = Column(Integer, primary_key=True, index=True)

    image_id = Column(
        Integer,
        ForeignKey("images.id", ondelete="CASCADE"),
        unique=True
    )

    prediction_label = Column(String(50))

    confidence = Column(Float)

    image = relationship(
        "Image",
        back_populates="prediction"
    )

    report = relationship(
        "Report",
        back_populates="prediction",
        uselist=False,
        cascade="all, delete-orphan"
    )