from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class ChatRequest(BaseModel):
    message: str
    language: str = "hi-IN"

class ChatResponse(BaseModel):
    response: str
    language: str
    is_emergency: bool = False

@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    # Placeholder — Groq integration comes in Phase 2
    return ChatResponse(
        response=f"Backend received: {request.message} in language {request.language}. Phase 2 will connect Groq.",
        language=request.language,
        is_emergency=False
    )