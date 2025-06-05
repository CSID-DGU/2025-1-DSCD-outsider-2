from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db, engine
from ..models.womanuserdata import WomanUser, Base
from ..models.manuserdata import ManUser
import pandas as pd

router = APIRouter(prefix="/data", tags=["Data"])

@router.post("/import")
async def import_data(db: Session = Depends(get_db)):
    try:
        # 기존 데이터 삭제 (선택 사항)
        db.execute("DELETE FROM womanuserdata")
        db.execute("DELETE FROM manuserdata")
        db.commit()

        # 남자 데이터 삽입
        male_df = pd.read_csv("backend/data/남자프로필.csv", encoding='utf-8')
        for _, row in male_df.iterrows():
            man_user = ManUser(**{k: str(v) if pd.notna(v) else None for k, v in row.items()})
            db.merge(man_user)
        db.commit()

        # 여자 데이터 삽입
        female_df = pd.read_csv("backend/data/여자프로필.csv", encoding='utf-8')
        for _, row in female_df.iterrows():
            woman_user = WomanUser(**{k: str(v) if pd.notna(v) else None for k, v in row.items()})
            db.merge(woman_user)
        db.commit()

        return {"message": "Data imported successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Import failed: {str(e)}")