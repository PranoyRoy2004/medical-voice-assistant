from pydantic import BaseModel

class ChatResponse(BaseModel):
    response: str
    language: str
    is_emergency: bool = False