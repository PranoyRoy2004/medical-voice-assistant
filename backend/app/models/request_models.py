from pydantic import BaseModel, Field
from typing import Literal

class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=2000)
    language: Literal[
        "hi-IN", "bn-IN", "ta-IN", "te-IN", "or-IN", "mr-IN"
    ] = "hi-IN"
    
    class Config:
        json_schema_extra = {
            "example": {
                "message": "मुझे सिर दर्द और बुखार है",
                "language": "hi-IN"
            }
        }