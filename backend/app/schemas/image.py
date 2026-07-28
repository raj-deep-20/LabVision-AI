from pydantic import BaseModel


class ImageResponse(BaseModel):

    id: int
    sample_id: int
    image_name: str
    image_path: str

    class Config:
        from_attributes = True