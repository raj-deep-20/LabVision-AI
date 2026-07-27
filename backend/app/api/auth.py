from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from app.core.dependencies import get_current_user
from app.models.user import User

from app.core.database import get_db

from app.schemas.user import (
    UserRegister,
    UserLogin,
    UserResponse
)

from app.schemas.token import Token

from app.services.auth_service import (
    register_user,
    login_user
)

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post(
    "/register",
    response_model=UserResponse,
    status_code=201
)
def register(
    user: UserRegister,
    db: Session = Depends(get_db)
):

    try:

        return register_user(
            db,
            user
        )

    except ValueError as e:

        raise HTTPException(
            status_code=400,
            detail=str(e)
        )


@router.post(
    "/login",
    response_model=Token
)
def login(
    credentials: UserLogin,
    db: Session = Depends(get_db)
):

    try:

        return login_user(
            db,
            credentials
        )

    except ValueError as e:

        raise HTTPException(
            status_code=401,
            detail=str(e)
        )
        
@router.get("/me")
def get_logged_in_user(
    current_user: User = Depends(get_current_user)
):

    return {
        "id": current_user.id,
        "name": current_user.name,
        "email": current_user.email
    }