from fastapi import APIRouter, HTTPException
from app.models.request_models import ChatRequest
from app.models.response_models import ChatResponse
from app.services.medical_service import process_medical_query

router = APIRouter()

@router.post("/chat", response_model=ChatResponse)
async def chat(body: ChatRequest):
    try:
        result = await process_medical_query(
            message=body.message,
            language=body.language
        )
        return ChatResponse(**result)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Medical AI service error: {str(e)}"
        )

@router.get("/languages")
def get_languages():
    return {
        "languages": [
            {"code": "hi-IN", "name": "हिंदी",  "english": "Hindi"},
            {"code": "bn-IN", "name": "বাংলা",  "english": "Bengali"},
            {"code": "ta-IN", "name": "தமிழ்",  "english": "Tamil"},
            {"code": "te-IN", "name": "తెలుగు", "english": "Telugu"},
            {"code": "or-IN", "name": "ଓଡ଼ିଆ",  "english": "Odia"},
            {"code": "mr-IN", "name": "मराठी",  "english": "Marathi"},
        ]
    }