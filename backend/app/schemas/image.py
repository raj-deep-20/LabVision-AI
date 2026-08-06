from pydantic import BaseModel


class ImageResponse(BaseModel):

    sample_code: str
    image_name: str
    image_path: str