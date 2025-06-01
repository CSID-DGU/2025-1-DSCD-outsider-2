# datingapp_api/routers/place.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models.place import Place as PlaceModel
from schemas.place import Place as PlaceSchema

router = APIRouter(prefix="/places", tags=["Places"])

@router.get("/", response_model=List[PlaceSchema])
def get_places(db: Session = Depends(get_db)):
    try:
        places = db.query(PlaceModel).all()
        if not places:
            raise HTTPException(status_code=404, detail="No places found")
        return places
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching data: {str(e)}")

@router.get("/{place_name}/{address}", response_model=PlaceSchema)
def get_place_by_name_and_address(place_name: str, address: str, db: Session = Depends(get_db)):
    try:
        place = db.query(PlaceModel).filter(
            PlaceModel.place_name == place_name,
            PlaceModel.address == address
        ).first()
        if not place:
            raise HTTPException(status_code=404, detail="Place not found")
        return place
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching data: {str(e)}")