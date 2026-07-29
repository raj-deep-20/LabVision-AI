import numpy as np

from app.ml.model import model
from app.ml.preprocess import preprocess_image

classes = [
    "Parasitized",
    "Uninfected"
]

def predict_image(image_path):

    image = preprocess_image(image_path)

    prediction = model.predict(image, verbose=0)

    probability = float(prediction[0][0])

    if probability > 0.5:
        disease = "Uninfected"
        confidence = probability * 100
    else:
        disease = "Parasitized"
        confidence = (1 - probability) * 100

    return {
        "disease": disease,
        "confidence": round(confidence,2)
    }