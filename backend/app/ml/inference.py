import numpy as np
import cv2
import tensorflow as tf

from app.ml.labels import CLASS_NAMES


MODEL_PATH = "app/ml/trained_model.h5"

model = tf.keras.models.load_model(MODEL_PATH)


IMG_SIZE = (224, 224)


def predict_image(image_path):

    image = cv2.imread(image_path)

    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

    image = cv2.resize(image, IMG_SIZE)

    image = image.astype("float32") / 255.0

    image = np.expand_dims(image, axis=0)

    prediction = model.predict(image, verbose=0)

    probability = float(prediction[0][0])

    if probability >= 0.5:
        label = CLASS_NAMES[1]
        confidence = probability
    else:
        label = CLASS_NAMES[0]
        confidence = 1 - probability

    return {
        "label": label,
        "confidence": round(confidence * 100, 2)
    }