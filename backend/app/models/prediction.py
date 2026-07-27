from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import Float
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

from app.core.database import Base


class Prediction(Base):

    __tablename__ = "predictions"

    id = Column(Integer, primary_key=True)

    image_id = Column(
        Integer,
        ForeignKey("images.id")
    )

    rbc_count = Column(Integer)

    wbc_count = Column(Integer)

    platelet_count = Column(Integer)

    confidence = Column(Float)

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