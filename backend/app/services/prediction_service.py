from sqlalchemy.orm import Session

from app.models.image import Image
from app.models.prediction import Prediction

from app.ml.inference import predict_image


def create_prediction(db: Session, image_id: int):

    image = db.query(Image).filter(
        Image.id == image_id
    ).first()

    if image is None:
        raise ValueError("Image not found.")

    existing = db.query(Prediction).filter(
        Prediction.image_id == image_id
    ).first()

    if existing:
        return existing

    result = predict_image(image.image_path)

    prediction = Prediction(

        image_id=image.id,

        prediction_label=result["label"],

        confidence=result["confidence"]

    )

    db.add(prediction)

    db.commit()

    db.refresh(prediction)

    return prediction