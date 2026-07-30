import cv2
import numpy as np


# ----------------------------
# Image Quality
# ----------------------------

def check_image_quality(image):

    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Blur Detection
    blur_score = cv2.Laplacian(gray, cv2.CV_64F).var()

    # Brightness
    brightness = np.mean(gray)

    if blur_score < 80:
        quality = "Blurry"

    elif brightness < 50:
        quality = "Too Dark"

    elif brightness > 220:
        quality = "Overexposed"

    else:
        quality = "Good"

    return quality


# ----------------------------
# RBC Counter
# ----------------------------

def count_rbc(image):

    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    blur = cv2.GaussianBlur(gray, (5, 5), 0)

    circles = cv2.HoughCircles(
        blur,
        cv2.HOUGH_GRADIENT,
        dp=1.2,
        minDist=18,
        param1=60,
        param2=22,
        minRadius=8,
        maxRadius=30
    )

    if circles is None:
        return 0

    return len(circles[0])


# ----------------------------
# WBC Counter
# ----------------------------

def count_wbc(image):

    hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)

    lower = np.array([100, 40, 40])
    upper = np.array([170, 255, 255])

    mask = cv2.inRange(hsv, lower, upper)

    contours, _ = cv2.findContours(
        mask,
        cv2.RETR_EXTERNAL,
        cv2.CHAIN_APPROX_SIMPLE
    )

    return len(contours)


# ----------------------------
# Platelet Counter
# ----------------------------

def count_platelets(image):

    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    _, thresh = cv2.threshold(
        gray,
        180,
        255,
        cv2.THRESH_BINARY
    )

    contours, _ = cv2.findContours(
        thresh,
        cv2.RETR_EXTERNAL,
        cv2.CHAIN_APPROX_SIMPLE
    )

    platelets = 0

    for contour in contours:

        area = cv2.contourArea(contour)

        if 2 < area < 50:
            platelets += 1

    return platelets


# ----------------------------
# Main Function
# ----------------------------

def analyse_image(image_path):

    image = cv2.imread(image_path)

    if image is None:
        raise ValueError("Image not found.")

    result = {

        "image_quality": check_image_quality(image),

        "rbc_count": count_rbc(image),

        "wbc_count": count_wbc(image),

        "platelet_count": count_platelets(image)

    }

    return result