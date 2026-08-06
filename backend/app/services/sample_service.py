from sqlalchemy.orm import Session, joinedload

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
        .filter(Patient.patient_id == sample.patient_code)
        .first()
    )

    if not patient:
        raise ValueError("Patient not found.")

    new_sample = Sample(
        sample_id=generate_sample_id(db),
        patient_id=patient.id,
        sample_type=sample.sample_type,
        collection_date=sample.collection_date,
        remarks=sample.remarks,
        status="Pending"
    )

    db.add(new_sample)
    db.commit()
    db.refresh(new_sample)

    # Re-query with eager-loaded patient for response serialization
    return (
        db.query(Sample)
        .options(joinedload(Sample.patient))
        .filter(Sample.id == new_sample.id)
        .first()
    )


def get_all_samples(db: Session):

    return (
        db.query(Sample)
        .options(joinedload(Sample.patient))
        .all()
    )


def get_sample_by_code(db: Session, sample_code: str):

    return (
        db.query(Sample)
        .options(joinedload(Sample.patient))
        .filter(Sample.sample_id == sample_code)
        .first()
    )


def update_sample(
    db: Session,
    sample_code: str,
    sample: SampleUpdate
):

    existing = (
        db.query(Sample)
        .options(joinedload(Sample.patient))
        .filter(Sample.sample_id == sample_code)
        .first()
    )

    if not existing:
        return None

    update_data = sample.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(existing, key, value)

    db.commit()
    db.refresh(existing)

    return (
        db.query(Sample)
        .options(joinedload(Sample.patient))
        .filter(Sample.sample_id == sample_code)
        .first()
    )


def delete_sample(
    db: Session,
    sample_code: str
):

    sample = (
        db.query(Sample)
        .filter(Sample.sample_id == sample_code)
        .first()
    )

    if not sample:
        return None

    db.delete(sample)
    db.commit()

    return sample