from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from app.core.dependencies import get_current_user
from app.models.user import User

from sqlalchemy.orm import Session

from app.core.database import get_db

from app.schemas.patient import (
    PatientCreate,
    PatientResponse
)

from app.services.patient_service import (
    create_patient,
    get_all_patients,
    get_patient_by_id,
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
        new_patient = create_patient(db, patient)
        return new_patient
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
    "/{patient_id}",
    response_model=PatientResponse
)
def fetch_patient(
    patient_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    patient = get_patient_by_id(db, patient_id)

    if not patient:
        raise HTTPException(
            status_code=404,
            detail="Patient not found"
        )

    return patient


@router.put(
    "/{patient_id}",
    response_model=PatientResponse
)
def edit_patient(
    patient_id: int,
    updated_patient: PatientCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    patient = update_patient(
        db,
        patient_id,
        updated_patient
    )

    if not patient:
        raise HTTPException(
            status_code=404,
            detail="Patient not found"
        )

    return patient


@router.delete("/{patient_id}")
def remove_patient(
    patient_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    patient = delete_patient(
        db,
        patient_id
    )

    if not patient:
        raise HTTPException(
            status_code=404,
            detail="Patient not found"
        )

    return {
        "message": "Patient deleted successfully"
    }