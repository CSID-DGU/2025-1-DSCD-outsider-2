from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from dependencies import get_db, engine
from sqlalchemy.ext.declarative import declarative_base
from routers import matching, manuserdata, womanuserdata  # ✅ 라우터 전부 import
from routers import womanuserdata, manuserdata, data_import

Base = declarative_base()
app = FastAPI()

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://2025-1-dscd-outsider-2.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# DB 테이블 생성
Base.metadata.create_all(bind=engine)

# 라우터 등록
app.include_router(matching.router)
app.include_router(manuserdata.router)
app.include_router(womanuserdata.router)
app.include_router(data_import.router)

@app.get("/")
async def root():
    return {"message": "Welcome to the Dating App Matching API"}