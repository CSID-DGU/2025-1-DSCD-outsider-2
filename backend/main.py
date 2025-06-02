from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from dependencies import get_db, engine
from sqlalchemy.ext.declarative import declarative_base
from routers import matching  # matching 라우터만 가져오기

Base = declarative_base()

app = FastAPI()

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 데이터베이스 테이블 생성
Base.metadata.create_all(bind=engine)

# 라우터 등록
app.include_router(matching.router)

@app.get("/")
async def root():
    return {"message": "Welcome to the Dating App Matching API"}