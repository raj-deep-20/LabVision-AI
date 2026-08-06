import os
from datetime import datetime

from reportlab.pdfgen import canvas
from sqlalchemy.orm import Session

from app.models.sample import Sample
from app.models.image import Image
from app.models.prediction import Prediction


REPORT_FOLDER = "reports"
os.makedirs(REPORT_FOLDER, exist_ok=True)


def generate_report(db: Session, sample_code: str):

    # ----------------------------
    # Find Sample
    # ----------------------------

    sample = (
        db.query(Sample)
        .filter(Sample.sample_id == sample_code)
        .first()
    )

    if not sample:
        raise ValueError("Sample not found.")

    # ----------------------------
    # Find Latest Image
    # ----------------------------

    image = (
        db.query(Image)
        .filter(Image.sample_id == sample.id)
        .order_by(Image.id.desc())
        .first()
    )

    if not image:
        raise ValueError("Image not found.")

    # ----------------------------
    # Find Prediction
    # ----------------------------

    prediction = (
        db.query(Prediction)
        .filter(Prediction.image_id == image.id)
        .first()
    )

    if not prediction:
        raise ValueError("Prediction not found.")

    # ----------------------------
    # Patient Details
    # ----------------------------

    patient = sample.patient

    # ----------------------------
    # Create PDF
    # ----------------------------

    pdf_path = os.path.join(
        REPORT_FOLDER,
        f"{sample.sample_id}_report.pdf"
    )

    pdf = canvas.Canvas(pdf_path)

    y = 800

    pdf.setFont("Helvetica-Bold", 18)
    pdf.drawString(170, y, "LabVision AI Report")

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
    y -= 20

    pdf.drawString(50, y, f"Sample ID : {sample.sample_id}")
    y -= 20

    pdf.drawString(
        50,
        y,
        f"Collection Date : {sample.collection_date}"
    )

    y -= 40

    pdf.setFont("Helvetica-Bold", 14)
    pdf.drawString(50, y, "Prediction Result")

    y -= 25

    pdf.setFont("Helvetica", 12)

    pdf.drawString(50, y, f"Disease : {prediction.disease}")
    y -= 20

    pdf.drawString(
        50,
        y,
        f"Confidence : {prediction.confidence:.2%}"
    )
    y -= 20

    pdf.drawString(
        50,
        y,
        f"Image Quality : {prediction.image_quality}"
    )
    y -= 20

    pdf.drawString(
        50,
        y,
        f"RBC Count : {prediction.rbc_count}"
    )
    y -= 20

    pdf.drawString(
        50,
        y,
        f"WBC Count : {prediction.wbc_count}"
    )
    y -= 20

    pdf.drawString(
        50,
        y,
        f"Platelet Count : {prediction.platelet_count}"
    )
    y -= 40

    pdf.drawString(
        50,
        y,
        f"Generated On : {datetime.now().strftime('%d-%m-%Y %H:%M')}"
    )

    pdf.save()

    return pdf_path