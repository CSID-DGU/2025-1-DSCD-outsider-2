from sqlalchemy import Column, Integer, Float, DateTime, Boolean
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class MatchingResult(Base):
    __tablename__ = "matching_results"
    man_identifier = Column(Integer, primary_key=True)
    woman_identifier = Column(Integer, primary_key=True)
    total_similarity = Column(Float, nullable=False)
    match_date = Column(DateTime, nullable=False)

class MatchAcceptance(Base):
    __tablename__ = "match_acceptance"
    man_id = Column(Integer, primary_key=True)
    woman_id = Column(Integer, primary_key=True)
    man_accept = Column(Boolean, nullable=False)  # TINYINT(1) -> Boolean
    woman_accept = Column(Boolean, nullable=False)  # TINYINT(1) -> Boolean

class MatchSuccess(Base):
    __tablename__ = "match_success"
    man_id = Column(Integer, primary_key=True)
    woman_id = Column(Integer, primary_key=True)
    match_success = Column(Boolean, nullable=False)  # TINYINT(1) -> Boolean