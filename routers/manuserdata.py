from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models.manuserdata import Manuserdata as ManuserdataModel
from schemas.manuserdata import Manuserdata as ManuserdataSchema

router = APIRouter(prefix="/manuserdata", tags=["Manuserdata"])

@router.get("/", response_model=List[ManuserdataSchema])
def get_manuserdata(db: Session = Depends(get_db)):
    try:
        users = db.query(ManuserdataModel).all()
        if not users:
            raise HTTPException(status_code=404, detail="No man user data found")
        return users
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching data: {str(e)}")

@router.get("/{id}", response_model=ManuserdataSchema)
def get_manuserdata_by_id(id: int, db: Session = Depends(get_db)):
    try:
        user = db.query(ManuserdataModel).filter(ManuserdataModel.id == id).first()
        if not user:
            raise HTTPException(status_code=404, detail="Man user data not found")
        return user
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching data: {str(e)}")
 
# 추가한 부분 -> POST 요청 처리 함수    
@router.post("/", response_model=ManuserdataSchema)
def create_manuserdata(user_data: ManuserdataSchema, db: Session = Depends(get_db)):
    try:
        user = ManuserdataModel(**user_data.dict())
        db.add(user)
        db.commit()
        db.refresh(user)
        return user
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error saving man user data: {str(e)}")
