import os
import cv2
import numpy as np
import tensorflow as tf

from sqlalchemy.orm import Session

from app.models.image import Image
from app.models.prediction import Prediction
from app.services.opencv_service import analyse_image
from app.models.sample import Sample

# ----------------------------
# Load model only once
# ----------------------------

MODEL_PATH = "app/ml/trained_model.h5"

model = tf.keras.models.load_model(MODEL_PATH)


# ----------------------------
# Prediction Function
# ----------------------------

def predict_image(db: Session, sample_code: str):

    sample = (
        db.query(Sample)
        .filter(Sample.sample_id == sample_code)
        .first()
    )
    if not sample:
        raise ValueError("Sample not found.")

    image = (
        db.query(Image)
        .filter(Image.sample_id == sample.id)
        .order_by(Image.id.desc())
        .first()
    )
    if not image:
        raise ValueError("No image uploaded for this sample.")

    image_path = image.image_path

    if not os.path.exists(image_path):
        raise ValueError("Image file not found.")

    # ------------------------
    # OpenCV Analysis
    # ------------------------

    analysis = analyse_image(image_path)

    # ------------------------
    # TensorFlow Prediction
    # ------------------------

    img = cv2.imread(image_path)

    img = cv2.resize(img, (224, 224))

    img = img.astype("float32") / 255.0

    img = np.expand_dims(img, axis=0)

    prediction = model.predict(img, verbose=0)[0][0]

    if prediction > 0.5:
        disease = "Malaria +ve"
        confidence = float(prediction)
    else:
        disease = "Malaria -ve"
        confidence = float(1 - prediction)

    # ------------------------
    # Save to DB
    # ------------------------

    existing = (
        db.query(Prediction)
        .filter(Prediction.image_id == image.id)
        .first()
    )

    if existing:

        existing.disease = disease
        existing.confidence = confidence
        existing.image_quality = analysis["image_quality"]
        existing.rbc_count = analysis["rbc_count"]
        existing.wbc_count = analysis["wbc_count"]
        existing.platelet_count = analysis["platelet_count"]

        db.commit()
        db.refresh(existing)

    else:

        new_prediction = Prediction(
            image_id=image.id,
            disease=disease,
            confidence=confidence,
            image_quality=analysis["image_quality"],
            rbc_count=analysis["rbc_count"],
            wbc_count=analysis["wbc_count"],
            platelet_count=analysis["platelet_count"]
        )

        db.add(new_prediction)
        db.commit()
        db.refresh(new_prediction)

    return {
        "sample_code": sample_code,
        "disease": disease,
        "confidence": confidence,
        "image_quality": analysis["image_quality"],
        "rbc_count": analysis["rbc_count"],
        "wbc_count": analysis["wbc_count"],
        "platelet_count": analysis["platelet_count"],
    }