from sqlalchemy.orm import Session

from app.models.patient import Patient
from app.models.sample import Sample

from app.schemas.sample import (
    SampleCreate,
    SampleUpdate
)


def generate_sample_id(db: Session):

    last_sample = (
        db.query(Sample)
        .order_by(Sample.id.desc())
        .first()
    )

    if last_sample:
        last_number = int(last_sample.sample_id.replace("SMP", ""))
        return f"SMP{last_number + 1:06d}"

    return "SMP000001"


def create_sample(db: Session, sample: SampleCreate):

    patient = (
        db.query(Patient)
        .filter(Patient.id == sample.patient_id)
        .first()
    )

    if not patient:
        raise ValueError("Patient not found.")

    new_sample = Sample(
        sample_id=generate_sample_id(db),
        patient_id=sample.patient_id,
        sample_type=sample.sample_type,
        collection_date=sample.collection_date,
        remarks=sample.remarks,
        status="Pending"
    )

    db.add(new_sample)
    db.commit()
    db.refresh(new_sample)

    return new_sample


def get_all_samples(db: Session):

    return db.query(Sample).all()


def get_sample_by_id(db: Session, sample_id: int):

    return (
        db.query(Sample)
        .filter(Sample.id == sample_id)
        .first()
    )


def update_sample(
    db: Session,
    sample_id: int,
    sample: SampleUpdate
):

    existing = (
        db.query(Sample)
        .filter(Sample.id == sample_id)
        .first()
    )

    if not existing:
        return None

    update_data = sample.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(existing, key, value)

    db.commit()
    db.refresh(existing)

    return existing


def delete_sample(
    db: Session,
    sample_id: int
):

    sample = (
        db.query(Sample)
        .filter(Sample.id == sample_id)
        .first()
    )

    if not sample:
        return None

    db.delete(sample)
    db.commit()

    return sample