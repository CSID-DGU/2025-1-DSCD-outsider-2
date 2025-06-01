from pydantic import BaseModel
from datetime import datetime
from typing import List

class MatchingResultBase(BaseModel):
    man_identifier: int
    woman_identifier: int
    total_similarity: float
    match_date: datetime

class MatchingResult(MatchingResultBase):
    class Config:
        from_attributes = True  # SQLAlchemy 객체를 Pydantic 모델로 변환 허용

class MatchingResultCreate(MatchingResultBase):
    pass

class MatchAcceptanceCreate(BaseModel):
    man_id: int
    woman_id: int
    man_accept: bool
    woman_accept: bool