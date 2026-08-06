from sqlalchemy.orm import Session

from app.models.patient import Patient
from app.schemas.patient import PatientCreate


# ----------------------------------------------------
# Generate Patient ID
# ----------------------------------------------------

def generate_patient_id(db: Session):

    last_patient = (
        db.query(Patient)
        .order_by(Patient.patient_id.desc())
        .first()
    )

    if not last_patient:
        return "PAT000001"

    last_number = int(
        last_patient.patient_id.replace("PAT", "")
    )

    return f"PAT{last_number + 1:06d}"


# ----------------------------------------------------
# Create Patient
# ----------------------------------------------------

def create_patient(
    db: Session,
    patient: PatientCreate
):

    existing = (
        db.query(Patient)
        .filter(Patient.phone == patient.phone)
        .first()
    )

    if existing:
        raise ValueError(
            "Phone number already exists."
        )

    new_patient = Patient(

        patient_id=generate_patient_id(db),

        name=patient.name,

        age=patient.age,

        gender=patient.gender,

        blood_group=patient.blood_group,

        phone=patient.phone,

        doctor=patient.doctor,

        visit_date=patient.visit_date

    )

    db.add(new_patient)

    db.commit()

    db.refresh(new_patient)

    return new_patient


# ----------------------------------------------------
# Get All Patients
# ----------------------------------------------------

def get_all_patients(
    db: Session
):

    return (
        db.query(Patient)
        .order_by(Patient.created_at.desc())
        .all()
    )


# ----------------------------------------------------
# Get Patient by Patient Code
# ----------------------------------------------------

def get_patient_by_code(
    db: Session,
    patient_code: str
):

    return (
        db.query(Patient)
        .filter(
            Patient.patient_id == patient_code
        )
        .first()
    )


# ----------------------------------------------------
# Update Patient
# ----------------------------------------------------

def update_patient(
    db: Session,
    patient_code: str,
    patient: PatientCreate
):

    existing_patient = (
        db.query(Patient)
        .filter(
            Patient.patient_id == patient_code
        )
        .first()
    )

    if not existing_patient:
        return None

    existing_patient.name = patient.name
    existing_patient.age = patient.age
    existing_patient.gender = patient.gender
    existing_patient.blood_group = patient.blood_group
    existing_patient.phone = patient.phone
    existing_patient.doctor = patient.doctor
    existing_patient.visit_date = patient.visit_date

    db.commit()

    db.refresh(existing_patient)

    return existing_patient


# ----------------------------------------------------
# Delete Patient
# ----------------------------------------------------

def delete_patient(
    db: Session,
    patient_code: str
):

    patient = (
        db.query(Patient)
        .filter(
            Patient.patient_id == patient_code
        )
        .first()
    )

    if not patient:
        return None

    db.delete(patient)

    db.commit()

    return patient