from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user

from app.models.user import User

from app.schemas.patient import (
    PatientCreate,
    PatientResponse
)

from app.services.patient_service import (
    create_patient,
    get_all_patients,
    get_patient_by_code,
    update_patient,
    delete_patient
)

router = APIRouter(
    prefix="/patients",
    tags=["Patients"]
)


@router.post(
    "/",
    response_model=PatientResponse,
    status_code=201
)
def add_patient(
    patient: PatientCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    try:
        return create_patient(db, patient)
    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )


@router.get(
    "/",
    response_model=list[PatientResponse]
)
def fetch_patients(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return get_all_patients(db)


@router.get(
    "/{patient_code}",
    response_model=PatientResponse
)
def fetch_patient(
    patient_code: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    patient = get_patient_by_code(db, patient_code)

    if not patient:
        raise HTTPException(
            status_code=404,
            detail="Patient not found"
        )

    return patient


@router.put(
    "/{patient_code}",
    response_model=PatientResponse
)
def edit_patient(
    patient_code: str,
    updated_patient: PatientCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    patient = update_patient(
        db,
        patient_code,
        updated_patient
    )

    if not patient:
        raise HTTPException(
            status_code=404,
            detail="Patient not found"
        )

    return patient


@router.delete("/{patient_code}")
def remove_patient(
    patient_code: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    patient = delete_patient(
        db,
        patient_code
    )

    if not patient:
        raise HTTPException(
            status_code=404,
            detail="Patient not found"
        )

    return {
        "message": "Patient deleted successfully"
    }