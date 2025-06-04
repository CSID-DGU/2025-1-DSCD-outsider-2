from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models.womanuserdata import Womanuserdata as WomanuserdataModel
from schemas.womanuserdata import Womanuserdata as WomanuserdataSchema

router = APIRouter(prefix="/womanuserdata", tags=["Womanuserdata"])

@router.get("/", response_model=List[WomanuserdataSchema])
def get_womanuserdata(db: Session = Depends(get_db)):
    try:
        users = db.query(WomanuserdataModel).all()
        if not users:
            raise HTTPException(status_code=404, detail="No woman user data found")
        return users
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching data: {str(e)}")

@router.get("/{id}", response_model=WomanuserdataSchema)
def get_womanuserdata_by_id(id: int, db: Session = Depends(get_db)):
    try:
        user = db.query(WomanuserdataModel).filter(WomanuserdataModel.id == id).first()
        if not user:
            raise HTTPException(status_code=404, detail="Woman user data not found")
        return user
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching data: {str(e)}")
    
    
#추가한 부분 -> POST 요청 처리 함수        
@router.post("/", response_model=WomanuserdataSchema)
def create_womanuserdata(user_data: WomanuserdataSchema, db: Session = Depends(get_db)):
    try:
        user = WomanuserdataModel(**user_data.dict())
        db.add(user)
        db.commit()
        db.refresh(user)
        return user
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error saving woman user data: {str(e)}")

