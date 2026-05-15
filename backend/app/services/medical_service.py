from app.prompts.system_prompt import MEDICAL_SYSTEM_PROMPT
from app.services.groq_service import call_groq
from app.services.safety_service import check_emergency

LANGUAGE_NAMES = {
    "hi-IN": "Hindi",
    "bn-IN": "Bengali",
    "ta-IN": "Tamil",
    "te-IN": "Telugu",
    "or-IN": "Odia",
    "mr-IN": "Marathi",
}

async def process_medical_query(message: str, language: str) -> dict:
    """
    Main pipeline:
    1. Emergency check
    2. Groq LLM call
    3. Return structured response
    """
    # Step 1 — Emergency check (before calling LLM)
    is_emergency, emergency_message = check_emergency(message, language)
    
    if is_emergency:
        return {
            "response": emergency_message,
            "language": language,
            "is_emergency": True,
        }
    
    # Step 2 — Build language-aware prompt
    lang_name = LANGUAGE_NAMES.get(language, "Hindi")
    enhanced_message = f"[User is speaking in {lang_name}]\n\nUser says: {message}"
    
    # Step 3 — Call Groq
    ai_response = await call_groq(MEDICAL_SYSTEM_PROMPT, enhanced_message)
    
    return {
        "response": ai_response,
        "language": language,
        "is_emergency": False,
    }