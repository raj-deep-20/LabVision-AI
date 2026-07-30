from pydantic import BaseModel


class ReportResponse(BaseModel):
    message: str
    pdf_path: str