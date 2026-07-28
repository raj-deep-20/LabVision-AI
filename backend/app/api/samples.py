from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user

from app.models.user import User

from app.schemas.sample import (
    SampleCreate,
    SampleUpdate,
    SampleResponse
)

from app.services.sample_service import (
    create_sample,
    get_all_samples,
    get_sample_by_id,
    update_sample,
    delete_sample
)

router = APIRouter(
    prefix="/samples",
    tags=["Samples"]
)


# ----------------------------------------
# Create Sample
# ----------------------------------------
@router.post(
    "/",
    response_model=SampleResponse,
    status_code=status.HTTP_201_CREATED
)
def add_sample(
    sample: SampleCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    try:
        return create_sample(db, sample)

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


# ----------------------------------------
# Get All Samples
# ----------------------------------------
@router.get(
    "/",
    response_model=List[SampleResponse]
)
def fetch_samples(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return get_all_samples(db)


# ----------------------------------------
# Get Sample by ID
# ----------------------------------------
@router.get(
    "/{sample_id}",
    response_model=SampleResponse
)
def fetch_sample(
    sample_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    sample = get_sample_by_id(db, sample_id)

    if not sample:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Sample not found"
        )

    return sample


# ----------------------------------------
# Update Sample
# ----------------------------------------
@router.put(
    "/{sample_id}",
    response_model=SampleResponse
)
def edit_sample(
    sample_id: int,
    sample: SampleUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    updated_sample = update_sample(
        db,
        sample_id,
        sample
    )

    if not updated_sample:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Sample not found"
        )

    return updated_sample


# ----------------------------------------
# Delete Sample
# ----------------------------------------
@router.delete("/{sample_id}")
def remove_sample(
    sample_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    sample = delete_sample(db, sample_id)

    if not sample:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Sample not found"
        )

    return {
        "message": "Sample deleted successfully"
    }