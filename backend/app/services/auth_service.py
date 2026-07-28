from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from app.models.user import User
from app.schemas.user import UserRegister, UserLogin

from app.core.security import (
    hash_password,
    verify_password,
    create_access_token
)


def register_user(db: Session, user: UserRegister):

    existing_user = (
        db.query(User)
        .filter(User.email == user.email)
        .first()
    )

    if existing_user:
        raise ValueError("Email already registered.")

    new_user = User(
        name=user.name,
        email=user.email,
        password=hash_password(user.password),
        role="technician"
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


def login_user(db: Session, credentials: UserLogin):

    user = (
        db.query(User)
        .filter(User.email == credentials.email)
        .first()
    )

    if not user:
        raise ValueError("Invalid email or password.")

    if not verify_password(
        credentials.password,
        user.password
    ):
        raise ValueError("Invalid email or password.")

    token = create_access_token(
        {
            "sub": user.email,
            "id": user.id,
            "role": user.role
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }