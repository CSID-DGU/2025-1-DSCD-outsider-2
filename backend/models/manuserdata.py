from sqlalchemy import Column, Integer, String, Boolean
from database import Base

class Manuserdata(Base):
    __tablename__ = "manuserdata"

    id = Column(Integer, primary_key=True)
    kakao_id = Column(String(50))
    password = Column(String(100))
    gender = Column(String(10))
    height = Column(String(50))
    age_group = Column(String(50))
    alcohol = Column(String(50))
    smoking = Column(String(50))
    religion = Column(String(50))
    education = Column(String(50))
    mbti_energy = Column(String(10))
    mbti_sensing = Column(String(10))
    mbti_thinking = Column(String(10))
    mbti_judging = Column(String(10))
    preferred_height = Column(String(255))
    preferred_age = Column(String(255))
    preferred_alcohol = Column(String(255))
    preferred_smoking = Column(String(255))
    preferred_religion = Column(String(255))
    preferred_education = Column(String(255))
    preferred_energy = Column(String(255))
    preferred_sensing = Column(String(255))
    preferred_thinking = Column(String(255))
    preferred_judging = Column(String(255))
    preferred_height_score = Column(Integer)
    preferred_age_score = Column(Integer)
    preferred_alcohol_score = Column(Integer)
    preferred_smoking_score = Column(Integer)
    preferred_religion_score = Column(Integer)
    preferred_education_score = Column(Integer)
    mbti_energy_score = Column(Integer)
    mbti_sensing_score = Column(Integer)
    mbti_thinking_score = Column(Integer)
    mbti_judging_score = Column(Integer)
    my_character = Column(String(255))
    hobby = Column(String(255))
    holiday = Column(String(255))
    dating_style = Column(String(255))
    strength_in_relationship = Column(String(255))
    ideal_personality = Column(String(255))
    ideal_hobby = Column(String(255))
    what_I_want_from_partner = Column(String(255))