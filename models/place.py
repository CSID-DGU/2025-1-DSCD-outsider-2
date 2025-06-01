# datingapp_api/models/place.py
from sqlalchemy import Column, String, Float, Boolean
from database import Base

class Place(Base):
    __tablename__ = "place"

    place_name = Column(String(255), primary_key=True)
    address = Column(String(255), primary_key=True)
    hashtags = Column(String(255))
    longitude = Column(Float)
    latitude = Column(Float)
    nearest_hotplace = Column(String(100))
    distance_km = Column(Float)
    over_1_5km = Column(Boolean)
    data_source = Column(String(50))