from sqlalchemy.orm import Session
from app.models.patient import Patient
from app.schemas.patient import PatientCreate
from uuid import uuid4


def generate_patient_id(db):
    last_patient = (
        db.query(Patient)
        .order_by(Patient.id.desc())
        .first()
    )

    if last_patient:
        last_number = int(last_patient.patient_id.replace("PAT", ""))
        return f"PAT{last_number + 1:06d}"

    return "PAT000001"


def create_patient(db: Session, patient: PatientCreate):
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

    existing = (
    db.query(Patient)
    .filter(Patient.phone == patient.phone)
    .first()
    )

    if existing:
        raise ValueError("Phone number already exists.")
    return new_patient


def get_all_patients(db: Session):
    return db.query(Patient).all()


def get_patient_by_id(db: Session, patient_id: int):
    return db.query(Patient).filter(Patient.id == patient_id).first()


def update_patient(db: Session, patient_id: int, patient: PatientCreate):

    existing_patient = db.query(Patient).filter(
        Patient.id == patient_id
    ).first()

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


def delete_patient(db: Session, patient_id: int):

    patient = db.query(Patient).filter(
        Patient.id == patient_id
    ).first()

    if not patient:
        return None

    db.delete(patient)
    db.commit()

    return patient