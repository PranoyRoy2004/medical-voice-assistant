from typing import Tuple

EMERGENCY_KEYWORDS = [
    # English
    "chest pain", "heart attack", "can't breathe", "cannot breathe",
    "unconscious", "not breathing", "heavy bleeding", "stroke",
    "seizure", "convulsion", "poisoning", "severe burn", "not responding",
    "overdose", "suicide", "hanging",
    # Hindi
    "सीने में दर्द", "दिल का दौरा", "सांस नहीं", "बेहोश",
    "बहुत खून", "दौरा", "जहर", "सांस रुक",
    # Bengali
    "বুকে ব্যথা", "হার্ট অ্যাটাক", "শ্বাস নিতে পারছি না",
    "অজ্ঞান", "অনেক রক্ত", "খিঁচুনি", "বিষ",
    # Tamil
    "மார்பு வலி", "மூச்சு விட முடியவில்லை", "மயக்கம்",
    # Telugu
    "గుండె నొప్పి", "శ్వాస తీసుకోలేకపోతున్నాను", "స్పృహ తప్పింది",
    # Odia
    "ଛାତି ବ୍ୟଥା", "ନିଶ୍ୱାସ ନେଇ ପାରୁନାହିଁ", "ଅଜ୍ଞାନ",
    # Marathi
    "छातीत दुखणे", "श्वास घेता येत नाही", "बेशुद्ध",
]

EMERGENCY_RESPONSE = {
    "hi-IN": "🚨 आपातकाल! यह एक गंभीर स्थिति है। तुरंत 112 पर कॉल करें या नजदीकी अस्पताल जाएं। देरी मत करें!",
    "bn-IN": "🚨 জরুরি অবস্থা! এটি একটি গুরুতর পরিস্থিতি। এখনই ১১২ তে কল করুন অথবা নিকটস্থ হাসপাতালে যান। দেরি করবেন না!",
    "ta-IN": "🚨 அவசரநிலை! இது தீவிரமான நிலை. உடனே 112 என்று அழைக்கவும் அல்லது அருகிலுள்ள மருத்துவமனைக்கு செல்லவும்!",
    "te-IN": "🚨 అత్యవసరం! ఇది తీవ్రమైన పరిస్థితి. వెంటనే 112కి కాల్ చేయండి లేదా సమీపంలోని ఆసుపత్రికి వెళ్ళండి!",
    "or-IN": "🚨 ଜରୁରୀକାଳୀନ! ଏହା ଏକ ଗମ୍ଭୀର ପରିସ୍ଥିତି। ତୁରନ୍ତ ୧୧୨ କୁ କଲ୍ କରନ୍ତୁ ଅଥବା ନିକଟସ୍ଥ ଡାକ୍ତରଖାନାକୁ ଯାନ୍ତୁ!",
    "mr-IN": "🚨 आणीबाणी! ही एक गंभीर स्थिती आहे. ताबडतोब 112 वर कॉल करा किंवा जवळच्या रुग्णालयात जा!",
}

def check_emergency(text: str, language: str) -> Tuple[bool, str]:
    """
    Returns (is_emergency, emergency_message)
    """
    text_lower = text.lower()
    
    for keyword in EMERGENCY_KEYWORDS:
        if keyword.lower() in text_lower:
            message = EMERGENCY_RESPONSE.get(language, EMERGENCY_RESPONSE["hi-IN"])
            return True, message
    
    return False, ""