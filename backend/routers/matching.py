import pandas as pd
import numpy as np
from sqlalchemy import text
from sqlalchemy.orm import Session
from scipy.optimize import linear_sum_assignment
from sentence_transformers import SentenceTransformer, util
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from typing import List

from models.matching import MatchingResult, MatchAcceptance, MatchSuccess
from schemas.matching import MatchingResult, MatchingResultCreate, MatchAcceptanceCreate
from dependencies import get_db, engine

router = APIRouter(
    prefix="/matching",
    tags=["matching"],
)

# SentenceTransformer 모델 전역 로드 (최적화)
model = SentenceTransformer('jhgan/ko-sbert-multitask')

# 데이터베이스에서 데이터 불러오기
def load_user_data_from_db():
    try:
        query_man = text("SELECT * FROM manuserdata")
        with engine.connect() as connection:
            df_man = pd.read_sql_query(query_man, con=connection)
        print(f"manuserdata 테이블에서 {len(df_man)}개의 레코드를 불러왔습니다.")

        query_woman = text("SELECT * FROM womanuserdata")
        with engine.connect() as connection:
            df_woman = pd.read_sql_query(query_woman, con=connection)
        print(f"womanuserdata 테이블에서 {len(df_woman)}개의 레코드를 불러왔습니다.")

        if len(df_man) == 0 or len(df_woman) == 0:
            print("남자 또는 여자 데이터가 없습니다.")
            return pd.DataFrame(), pd.DataFrame()

        df_man = df_man.reset_index(drop=True)
        df_woman = df_woman.reset_index(drop=True)
        print(f"남자 {len(df_man)}명, 여자 {len(df_woman)}명의 데이터를 모두 사용합니다.")

        column_mapping = {
            'id': '식별번호',
            'gender': '본인 성별',
            'height': '본인 키',
            'age_group': '본인 나이',
            'alcohol': '본인 음주',
            'smoking': '본인 흡연',
            'religion': '본인 종교',
            'education': '본인 학력',
            'mbti_energy': '본인 MBTI - 에너지 방향',
            'mbti_sensing': '본인 MBTI - 인식 방식',
            'mbti_thinking': '본인 MBTI - 판단 방식',
            'mbti_judging': '본인 MBTI - 생활 양식',
            'preferred_height': '이상형 키',
            'preferred_age': '이상형 나이',
            'preferred_alcohol': '이상형 음주',
            'preferred_smoking': '이상형 흡연',
            'preferred_religion': '이상형 종교',
            'preferred_education': '이상형 학력',
            'preferred_energy': '이상형 MBTI - 에너지 방향',
            'preferred_sensing': '이상형 MBTI - 인식 방식',
            'preferred_thinking': '이상형 MBTI - 판단 방식',
            'preferred_judging': '이상형 MBTI - 생활 양식',
            'preferred_height_score': '키_가중치',
            'preferred_age_score': '나이_가중치',
            'preferred_alcohol_score': '음주_가중치',
            'preferred_smoking_score': '흡연_가중치',
            'preferred_religion_score': '종교_가중치',
            'preferred_education_score': '학력_가중치',
            'mbti_energy_score': 'MBTI - 에너지 방향_가중치',
            'mbti_sensing_score': 'MBTI - 인식 방식_가중치',
            'mbti_thinking_score': 'MBTI - 판단 방식_가중치',
            'mbti_judging_score': 'MBTI - 생활 양식_가중치',
            'my_character': '성격',
            'hobby': '취미',
            'holiday': '휴일',
            'dating_style': '데이트스타일',
            'strength_in_relationship': '연애장점',
            'ideal_personality': '이상형성격',
            'ideal_hobby': '이상형취미',
            'what_I_want_from_partner': '연인에게바라는점'
        }

        df_man = df_man.rename(columns=column_mapping)
        df_woman = df_woman.rename(columns=column_mapping)

        return df_man, df_woman
    except Exception as e:
        print(f"데이터 조회 중 오류 발생: {str(e)}")
        return pd.DataFrame(), pd.DataFrame()

def select_choice_columns(df):
    if df.empty:
        print("입력 DataFrame이 비어 있습니다.")
        return pd.DataFrame(), pd.DataFrame()

    columns_to_compare = {
        '이상형 키': '본인 키',
        '이상형 나이': '본인 나이',
        '이상형 음주': '본인 음주',
        '이상형 흡연': '본인 흡연',
        '이상형 종교': '본인 종교',
        '이상형 학력': '본인 학력',
        '이상형 MBTI - 에너지 방향': '본인 MBTI - 에너지 방향',
        '이상형 MBTI - 인식 방식': '본인 MBTI - 인식 방식',
        '이상형 MBTI - 판단 방식': '본인 MBTI - 판단 방식',
        '이상형 MBTI - 생활 양식': '본인 MBTI - 생활 양식'
    }
    weight_columns = [col.replace('이상형 ', '') + '_가중치' for col in columns_to_compare.keys()]
    
    select_ideal_columns = ['식별번호', '본인 성별'] + list(columns_to_compare.keys()) + weight_columns
    select_self_columns = ['식별번호', '본인 성별'] + list(columns_to_compare.values())
    
    missing_ideal = [col for col in select_ideal_columns if col not in df.columns]
    missing_self = [col for col in select_self_columns if col not in df.columns]
    
    if missing_ideal or missing_self:
        print(f"필요한 컬럼이 없습니다: ideal={missing_ideal}, self={missing_self}")
        return pd.DataFrame(), pd.DataFrame()
    
    select_ideal = df[select_ideal_columns]
    select_self = df[select_self_columns]
    return select_ideal, select_self

def select_text_columns(df):
    text_columns_to_compare = {
        '이상형성격': '성격',
        '이상형취미': '취미',
        '연인에게바라는점': '연애장점'
    }
    same_text_columns = ['휴일', '데이트스타일']
    all_columns = [
        '식별번호', '본인 성별', '성격', '취미', '휴일', '데이트스타일', '연애장점',
        '이상형성격', '이상형취미', '연인에게바라는점'
    ]
    
    missing_columns = [col for col in all_columns if col not in df.columns]
    if missing_columns:
        print(f"select_text_columns에 필요한 컬럼이 없습니다: {missing_columns}")
        return pd.DataFrame()
    
    return df[all_columns]

def calculate_select(df_man_select_ideal, df_man_select_self, df_woman_select_ideal, df_woman_select_self):
    comparison_results = pd.DataFrame()
    
    columns_to_compare = {
        '이상형 키': '본인 키',
        '이상형 나이': '본인 나이',
        '이상형 음주': '본인 음주',
        '이상형 흡연': '본인 흡연',
        '이상형 종교': '본인 종교',
        '이상형 학력': '본인 학력',
        '이상형 MBTI - 에너지 방향': '본인 MBTI - 에너지 방향',
        '이상형 MBTI - 인식 방식': '본인 MBTI - 인식 방식',
        '이상형 MBTI - 판단 방식': '본인 MBTI - 판단 방식',
        '이상형 MBTI - 생활 양식': '본인 MBTI - 생활 양식'
    }
    
    for man_idx, man_row in df_man_select_ideal.iterrows():
        man_self_row = df_man_select_self.iloc[man_idx]
        for woman_idx, woman_row in df_woman_select_self.iterrows():
            woman_ideal_row = df_woman_select_ideal.iloc[woman_idx]

            result_row = {
                '남자 식별번호': man_row['식별번호'],
                '여자 식별번호': woman_row['식별번호']
            }
            
            for ideal_col, self_col in columns_to_compare.items():
                ideal_value = man_row[ideal_col]
                if pd.isna(ideal_value):
                    ideal_values = []
                else:
                    ideal_values = ideal_value.split(', ') if isinstance(ideal_value, str) else [str(ideal_value)]
                result_row[f'남자_{ideal_col}_매칭'] = 1 if woman_row[self_col] in ideal_values else 0

            for ideal_col, self_col in columns_to_compare.items():
                woman_ideal_value = woman_ideal_row[ideal_col]
                if pd.isna(woman_ideal_value):
                    woman_ideal_values = []
                else:
                    woman_ideal_values = woman_ideal_value.split(', ') if isinstance(woman_ideal_value, str) else [str(woman_ideal_value)]
                result_row[f'여자_{ideal_col}_매칭'] = 1 if man_self_row[self_col] in woman_ideal_values else 0

            for idx, ideal_col in enumerate(columns_to_compare.keys()):
                weight_col = ideal_col.replace('이상형 ', '') + '_가중치'
                result_row[f'남자이상형_{weight_col}'] = man_row[weight_col]
                result_row[f'여자이상형_{weight_col}'] = woman_ideal_row[weight_col]

            comparison_results = pd.concat([comparison_results, pd.DataFrame([result_row])], ignore_index=True)
    
    return comparison_results

def calculate_write(df_man_write, df_woman_write):
    text_cols = ['성격', '취미', '휴일', '데이트스타일', '연애장점', '이상형성격', '이상형취미', '연인에게바라는점']
    man_embeddings = {col: model.encode(df_man_write[col].tolist(), convert_to_tensor=True) for col in text_cols}
    woman_embeddings = {col: model.encode(df_woman_write[col].tolist(), convert_to_tensor=True) for col in text_cols}

    results = []
    for man_idx in range(len(df_man_write)):
        for woman_idx in range(len(df_woman_write)):
            result_row = {
                '남자 식별번호': df_man_write.iloc[man_idx]['식별번호'],
                '여자 식별번호': df_woman_write.iloc[woman_idx]['식별번호']
            }
            result_row['성격vs이상형성격'] = float(util.cos_sim(man_embeddings['성격'][man_idx], woman_embeddings['이상형성격'][woman_idx]))
            result_row['취미vs이상형취미'] = float(util.cos_sim(man_embeddings['취미'][man_idx], woman_embeddings['이상형취미'][woman_idx]))
            result_row['휴일vs휴일'] = float(util.cos_sim(man_embeddings['휴일'][man_idx], woman_embeddings['휴일'][woman_idx]))
            result_row['데이트스타일vs데이트스타일'] = float(util.cos_sim(man_embeddings['데이트스타일'][man_idx], woman_embeddings['데이트스타일'][woman_idx]))
            result_row['연애장점vs연인에게바라는점'] = float(util.cos_sim(man_embeddings['연애장점'][man_idx], woman_embeddings['연인에게바라는점'][woman_idx]))
            result_row['이상형성격vs성격'] = float(util.cos_sim(man_embeddings['이상형성격'][man_idx], woman_embeddings['성격'][woman_idx]))
            result_row['이상형취미vs취미'] = float(util.cos_sim(man_embeddings['이상형취미'][man_idx], woman_embeddings['취미'][woman_idx]))
            result_row['연인에게바라는점vs연애장점'] = float(util.cos_sim(man_embeddings['연인에게바라는점'][man_idx], woman_embeddings['연애장점'][woman_idx]))
            results.append(result_row)

    results_df = pd.DataFrame(results)
    return results_df

def calculate_score(comparison_results, results_df):
    real_results = pd.merge(comparison_results, results_df, on=['남자 식별번호', '여자 식별번호'], how='inner')
    return real_results

def hungarian_matching(real_results):
    df = real_results.copy()
    
    male_cols = [
        '남자_이상형 키_매칭', '남자_이상형 나이_매칭', '남자_이상형 음주_매칭', '남자_이상형 흡연_매칭',
        '남자_이상형 종교_매칭', '남자_이상형 학력_매칭', '남자_이상형 MBTI - 에너지 방향_매칭',
        '남자_이상형 MBTI - 인식 방식_매칭', '남자_이상형 MBTI - 판단 방식_매칭', '남자_이상형 MBTI - 생활 양식_매칭'
    ]
    male_weight_cols = [
        '남자이상형_키_가중치', '남자이상형_나이_가중치', '남자이상형_음주_가중치', '남자이상형_흡연_가중치',
        '남자이상형_종교_가중치', '남자이상형_학력_가중치', '남자이상형_MBTI - 에너지 방향_가중치',
        '남자이상형_MBTI - 인식 방식_가중치', '남자이상형_MBTI - 판단 방식_가중치', '남자이상형_MBTI - 생활 양식_가중치'
    ]
    female_cols = [
        '여자_이상형 키_매칭', '여자_이상형 나이_매칭', '여자_이상형 음주_매칭', '여자_이상형 흡연_매칭',
        '여자_이상형 종교_매칭', '여자_이상형 학력_매칭', '여자_이상형 MBTI - 에너지 방향_매칭',
        '여자_이상형 MBTI - 인식 방식_매칭', '여자_이상형 MBTI - 판단 방식_매칭', '여자_이상형 MBTI - 생활 양식_매칭'
    ]
    female_weight_cols = [
        '여자이상형_키_가중치', '여자이상형_나이_가중치', '여자이상형_음주_가중치', '여자이상형_흡연_가중치',
        '여자이상형_종교_가중치', '여자이상형_학력_가중치', '여자이상형_MBTI - 에너지 방향_가중치',
        '여자이상형_MBTI - 인식 방식_가중치', '여자이상형_MBTI - 판단 방식_가중치', '여자이상형_MBTI - 생활 양식_가중치'
    ]
    
    male_score = ((df[male_weight_cols].values + 1) * df[male_cols].values).sum(axis=1)
    female_score = ((df[female_weight_cols].values + 1) * df[female_cols].values).sum(axis=1)
    df["정량적유사도"] = (male_score + female_score) / 110
    
    text_cols = df.columns[-8:]
    df["정성적유사도"] = df[text_cols].mean(axis=1)
    
    df["총유사도"] = 0.3 * df["정량적유사도"] + 0.7 * df["정성적유사도"]
    
    pivot = df.pivot(index="여자 식별번호", columns="남자 식별번호", values="총유사도")
    pivot_T = pivot.T
    
    cost_matrix = -pivot.values
    row_ind, col_ind = linear_sum_assignment(cost_matrix)
    hungarian_matches = pd.DataFrame({
        "여자 식별번호": pivot.index[row_ind],
        "남자 식별번호": pivot.columns[col_ind],
        "총유사도": pivot.values[row_ind, col_ind]
    })

    unmatched_men = list(set(df["남자 식별번호"].unique()) - set(hungarian_matches["남자 식별번호"]))
    all_women = list(df["여자 식별번호"].unique())
    sub_df = df[df["남자 식별번호"].isin(unmatched_men) & df["여자 식별번호"].isin(all_women)].copy()
    sub_men = sorted(sub_df["남자 식별번호"].unique())
    sub_women = sorted(sub_df["여자 식별번호"].unique())
    
    cost_matrix2 = pd.pivot_table(
        sub_df, values="총유사도", index="남자 식별번호", columns="여자 식별번호", fill_value=0
    ).reindex(index=sub_men, columns=sub_women).to_numpy()
    
    row_ind2, col_ind2 = linear_sum_assignment(-cost_matrix2)
    second_matches = pd.DataFrame({
        "남자 식별번호": [sub_men[i] for i in row_ind2],
        "여자 식별번호": [sub_women[j] for j in col_ind2],
        "총유사도": [cost_matrix2[i, j] for i, j in zip(row_ind2, col_ind2)]
    })
    
    final_matches = pd.concat([hungarian_matches, second_matches], ignore_index=True)
    return final_matches

@router.post("/run-matching", response_model=List[MatchingResult])
async def run_matching(db: Session = Depends(get_db)):
    df_man, df_woman = load_user_data_from_db()

    df_man_select_ideal, df_man_select_self = select_choice_columns(df_man)
    df_woman_select_ideal, df_woman_select_self = select_choice_columns(df_woman)
    comparison_results = calculate_select(df_man_select_ideal, df_man_select_self, df_woman_select_ideal, df_woman_select_self)

    df_man_write = select_text_columns(df_man)
    df_woman_write = select_text_columns(df_woman)
    results_df = calculate_write(df_man_write, df_woman_write)

    real_results = calculate_score(comparison_results, results_df)

    final_matches = hungarian_matching(real_results)

    print("\n=== 최종 매칭 결과 ===")
    print(final_matches)

    match_date = datetime.now()
    matches_to_save = []
    for _, row in final_matches.iterrows():
        match = MatchingResultCreate(
            man_identifier=row['남자 식별번호'],
            woman_identifier=row['여자 식별번호'],
            total_similarity=row['총유사도'],
            match_date=match_date
        )
        matches_to_save.append(match)

    try:
        for match in matches_to_save:
            existing = db.query(MatchingResult).filter(
                MatchingResult.man_identifier == match.man_identifier,
                MatchingResult.woman_identifier == match.woman_identifier
            ).first()
            if existing:
                existing.total_similarity = match.total_similarity
                existing.match_date = match.match_date
            else:
                db_match = MatchingResult(
                    man_identifier=match.man_identifier,
                    woman_identifier=match.woman_identifier,
                    total_similarity=match.total_similarity,
                    match_date=match.match_date
                )
                db.add(db_match)
        db.commit()
        print("✅ 매칭 결과를 matching_results 테이블에 저장했습니다.")
    except Exception as e:
        db.rollback()
        print(f"❌ 매칭 결과를 데이터베이스에 저장하는 중 오류 발생: {str(e)}")
        raise HTTPException(status_code=500, detail=f"데이터베이스 저장 오류: {str(e)}")

    try:
        saved_matches = db.query(MatchingResult).filter(
            MatchingResult.match_date == match_date
        ).all()
        return saved_matches
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"데이터 조회 오류: {str(e)}")

@router.get("/results", response_model=List[MatchingResult])
async def get_matching_results(db: Session = Depends(get_db)):
    try:
        matches = db.query(MatchingResult).all()
        return matches
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"데이터 조회 오류: {str(e)}")

@router.post("/acceptance")
async def submit_acceptance(acceptance: MatchAcceptanceCreate, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    try:
        # 이미 존재하는 데이터인지 확인
        existing = db.query(MatchAcceptance).filter(
            MatchAcceptance.man_id == acceptance.man_id,
            MatchAcceptance.woman_id == acceptance.woman_id
        ).first()
        if existing:
            existing.man_accept = acceptance.man_accept
            existing.woman_accept = acceptance.woman_accept
        else:
            db_acceptance = MatchAcceptance(
                man_id=acceptance.man_id,
                woman_id=acceptance.woman_id,
                man_accept=acceptance.man_accept,
                woman_accept=acceptance.woman_accept
            )
            db.add(db_acceptance)
        db.commit()

        background_tasks.add_task(process_acceptance, db)

        return {"message": "수락 여부가 저장되었습니다."}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"수락 여부 저장 오류: {str(e)}")

def process_acceptance(db: Session):
    try:
        accepted_matches = db.query(MatchAcceptance).filter(
            MatchAcceptance.man_accept == True,
            MatchAcceptance.woman_accept == True
        ).all()

        success_count = 0
        for match in accepted_matches:
            existing = db.query(MatchSuccess).filter(
                MatchSuccess.man_id == match.man_id,
                MatchSuccess.woman_id == match.woman_id
            ).first()
            if existing:
                existing.match_success = True
            else:
                new_match = MatchSuccess(
                    man_id=match.man_id,
                    woman_id=match.woman_id,
                    match_success=True
                )
                db.add(new_match)
                success_count += 1

            # 수락되지 않은 경우 (man_accept 또는 woman_accept가 False인 경우)
            not_accepted = db.query(MatchAcceptance).filter(
                (MatchAcceptance.man_id == match.man_id) &
                (MatchAcceptance.woman_id == match.woman_id) &
                ((MatchAcceptance.man_accept == False) | (MatchAcceptance.woman_accept == False))
            ).first()
            if not_accepted:
                existing = db.query(MatchSuccess).filter(
                    MatchSuccess.man_id == not_accepted.man_id,
                    MatchSuccess.woman_id == not_accepted.woman_id
                ).first()
                if existing:
                    existing.match_success = False
                else:
                    new_match = MatchSuccess(
                        man_id=not_accepted.man_id,
                        woman_id=not_accepted.woman_id,
                        match_success=False
                    )
                    db.add(new_match)

        db.commit()
        print(f"{success_count}개의 매칭이 match_success 테이블에 저장되었습니다.")
    except Exception as e:
        db.rollback()
        print(f"match_success 처리 중 오류 발생: {str(e)}")