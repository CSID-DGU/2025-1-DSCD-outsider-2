# datingapp_api/schemas/place.py
from pydantic import BaseModel

class Place(BaseModel):
    place_name: str
    address: str
    hashtags: str | None = None
    longitude: float | None = None
    latitude: float | None = None
    nearest_hotplace: str | None = None
    distance_km: float | None = None
    over_1_5km: bool | None = None
    data_source: str | None = None

    class Config:
        from_attributes = True