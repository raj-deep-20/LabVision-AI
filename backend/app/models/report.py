from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from app.core.database import Base


class Report(Base):
    __tablename__ = "reports"

    id = Column(Integer, primary_key=True)

    prediction_id = Column(
        Integer,
        ForeignKey("predictions.id", ondelete="CASCADE")
    )

    pdf_path = Column(String(300))

    prediction = relationship(
        "Prediction",
        back_populates="report"
    )