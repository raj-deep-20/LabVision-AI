from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from app.core.database import Base


class Image(Base):
    __tablename__ = "images"

    id = Column(Integer, primary_key=True)

    sample_id = Column(
        Integer,
        ForeignKey("samples.id", ondelete="CASCADE")
    )

    original_path = Column(String(300))

    annotated_path = Column(String(300))

    sample = relationship(
        "Sample",
        back_populates="images"
    )

    prediction = relationship(
        "Prediction",
        back_populates="image",
        uselist=False,
        cascade="all, delete-orphan"
    )