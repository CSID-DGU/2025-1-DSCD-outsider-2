from pydantic import BaseModel

class Womanuserdata(BaseModel):
    id: int
    kakao_id: str
    password: str
    gender: str | None
    height: str | None
    age_group: str | None
    alcohol: str | None
    smoking: str | None
    religion: str | None
    education: str | None
    mbti_energy: str | None
    mbti_sensing: str | None
    mbti_thinking: str | None
    mbti_judging: str | None
    preferred_height: str | None
    preferred_age: str | None
    preferred_alcohol: str | None
    preferred_smoking: str | None
    preferred_religion: str | None
    preferred_education: str | None
    preferred_energy: str | None
    preferred_sensing: str | None
    preferred_thinking: str | None
    preferred_judging: str | None
    preferred_height_score: int | None
    preferred_age_score: int | None
    preferred_alcohol_score: int | None
    preferred_smoking_score: int | None
    preferred_religion_score: int | None
    preferred_education_score: int | None
    mbti_energy_score: int | None
    mbti_sensing_score: int | None
    mbti_thinking_score: int | None
    mbti_judging_score: int | None
    my_character: str | None
    hobby: str | None
    holiday: str | None
    dating_style: str | None
    strength_in_relationship: str | None
    ideal_personality: str | None
    ideal_hobby: str | None
    what_I_want_from_partner: str | None

    class Config:
        from_attributes = True