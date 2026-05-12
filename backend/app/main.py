from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import chat, health

app = FastAPI(
    title="Medical Voice Assistant API",
    description="Regional Language Medical Voice Assistant for Rural India",
    version="1.0.0"
)

# CORS — allow frontend (localhost:3000 + Vercel) to call backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://*.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router, prefix="/api")
app.include_router(chat.router, prefix="/api")

@app.get("/")
def root():
    return {
        "message": "Medical Voice Assistant API is running",
        "status": "healthy"
    }