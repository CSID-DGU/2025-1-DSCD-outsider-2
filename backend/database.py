# datingapp_api/database.py (현재 코드)
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from dotenv import load_dotenv
import os
from fastapi import HTTPException

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise HTTPException(status_code=500, detail="DATABASE_URL 환경 변수가 설정되지 않았습니다. .env 파일을 확인하세요.")

try:
    engine = create_engine(
        DATABASE_URL,
        pool_size=5,
        max_overflow=10,
        pool_timeout=30,
        echo=False
    )
except Exception as e:
    raise HTTPException(status_code=500, detail=f"데이터베이스 연결 실패: {str(e)}")

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

class Base(DeclarativeBase):
    pass

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()