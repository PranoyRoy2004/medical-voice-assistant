import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from app.routers import chat, health

load_dotenv()

app = FastAPI(
    title="Swasthya Mitra API",
    description="Regional Language Medical Voice Assistant for Rural India",
    version="1.0.0"
)

allowed_origins = [
    "http://localhost:3000",
    "https://*.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router, prefix="/api")
app.include_router(chat.router, prefix="/api")

@app.get("/")
def root():
    return {
        "message": "Swasthya Mitra API is running 🏥",
        "status": "healthy",
        "docs": "/docs"
    }