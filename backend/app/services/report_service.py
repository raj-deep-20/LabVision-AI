import os
from datetime import datetime

from reportlab.lib.units import inch
from reportlab.pdfgen import canvas

from sqlalchemy.orm import Session

from app.models.prediction import Prediction


REPORT_FOLDER = "reports"

os.makedirs(REPORT_FOLDER, exist_ok=True)


def generate_report(db: Session, prediction_id: int):

    prediction = (
        db.query(Prediction)
        .filter(Prediction.id == prediction_id)
        .first()
    )

    if not prediction:
        raise ValueError("Prediction not found.")

    image = prediction.image
    sample = image.sample
    patient = sample.patient

    pdf_path = os.path.join(
        REPORT_FOLDER,
        f"report_{prediction.id}.pdf"
    )

    pdf = canvas.Canvas(pdf_path)

    y = 800

    pdf.setFont("Helvetica-Bold", 18)
    pdf.drawString(180, y, "LabVision AI Report")

    y -= 40

    pdf.setFont("Helvetica", 12)

    pdf.drawString(50, y, f"Patient ID : {patient.patient_id}")
    y -= 20

    pdf.drawString(50, y, f"Patient Name : {patient.name}")
    y -= 20

    pdf.drawString(50, y, f"Age : {patient.age}")
    y -= 20

    pdf.drawString(50, y, f"Gender : {patient.gender}")
    y -= 20

    pdf.drawString(50, y, f"Doctor : {patient.doctor}")
    y -= 40

    pdf.setFont("Helvetica-Bold", 14)
    pdf.drawString(50, y, "Prediction Result")

    y -= 25

    pdf.setFont("Helvetica", 12)

    pdf.drawString(50, y, f"Test Report : {prediction.disease}")
    y -= 20

    pdf.drawString(50, y, f"Confidence : {prediction.confidence:.2f}")
    y -= 20

    pdf.drawString(50, y, f"Image Quality : {prediction.image_quality}")
    y -= 20

    pdf.drawString(50, y, f"RBC Count : {prediction.rbc_count}")
    y -= 20

    pdf.drawString(50, y, f"WBC Count : {prediction.wbc_count}")
    y -= 20

    pdf.drawString(50, y, f"Platelet Count : {prediction.platelet_count}")
    y -= 40

    pdf.drawString(
        50,
        y,
        f"Generated : {datetime.now().strftime('%d-%m-%Y %H:%M')}"
    )

    pdf.save()

    return pdf_path