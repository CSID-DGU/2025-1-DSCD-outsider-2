# test.py (수정된 최종 버전)
import pandas as pd
from sqlalchemy import create_engine
from sqlalchemy.sql import text
from dotenv import load_dotenv
import os

# 환경 변수 로드 및 데이터베이스 연결
load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL 환경 변수가 설정되지 않았습니다. .env 파일을 확인하세요.")

try:
    engine = create_engine(DATABASE_URL)
except Exception as e:
    raise ValueError(f"데이터베이스 연결 실패: {str(e)}")

# 각 테이블 데이터를 불러오는 함수
def fetch_hotplace_data():
    query = text("SELECT * FROM hotplace")  # text()로 감싸기
    try:
        with engine.connect() as connection:
            df = pd.read_sql_query(query, con=connection)
        print(f"hotplace 테이블에서 {len(df)}개의 레코드를 불러왔습니다.")
        return df
    except Exception as e:
        print(f"hotplace 데이터 조회 중 오류 발생: {str(e)}")
        return pd.DataFrame()

def fetch_place_data():
    query = text("SELECT * FROM place")  # text()로 감싸기
    try:
        with engine.connect() as connection:
            df = pd.read_sql_query(query, con=connection)
        print(f"place 테이블에서 {len(df)}개의 레코드를 불러왔습니다.")
        return df
    except Exception as e:
        print(f"place 데이터 조회 중 오류 발생: {str(e)}")
        return pd.DataFrame()

def fetch_matchingcalculation_data():
    query = text("SELECT * FROM matchingcalculation")  # text()로 감싸기
    try:
        with engine.connect() as connection:
            df = pd.read_sql_query(query, con=connection)
        print(f"matchingcalculation 테이블에서 {len(df)}개의 레코드를 불러왔습니다.")
        return df
    except Exception as e:
        print(f"matchingcalculation 데이터 조회 중 오류 발생: {str(e)}")
        return pd.DataFrame()

# 데이터 불러오기
hotplace_df = fetch_hotplace_data()
place_df = fetch_place_data()
matchingcalculation_df = fetch_matchingcalculation_data()

# 불러온 데이터 확인
print("\n=== hotplace 데이터 미리보기 ===")
print(hotplace_df.head())
print("\n=== place 데이터 미리보기 ===")
print(place_df.head())
print("\n=== matchingcalculation 데이터 미리보기 ===")
print(matchingcalculation_df.head())