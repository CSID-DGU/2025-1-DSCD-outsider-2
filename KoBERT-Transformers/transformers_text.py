from transformers import BertTokenizer, BertModel
import torch
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

# KoBERT 모델 로드
model_name = 'monologg/kobert'  # 또는 사용할 다른 KoBERT 모델 이름
tokenizer = BertTokenizer.from_pretrained(model_name)
model = BertModel.from_pretrained(model_name)

# 두 텍스트 입력 받기
text1 = input("첫 번째 텍스트를 입력하세요: ")
text2 = input("두 번째 텍스트를 입력하세요: ")

# 텍스트 전처리: 토크나이저 사용하여 텍스트를 토큰화
inputs1 = tokenizer(text1, return_tensors='pt', padding=True, truncation=True)
inputs2 = tokenizer(text2, return_tensors='pt', padding=True, truncation=True)

# 모델을 사용하여 임베딩 계산 (두 텍스트)
with torch.no_grad():
    outputs1 = model(**inputs1)
    outputs2 = model(**inputs2)

# [CLS] 토큰의 임베딩 벡터 추출 (문장의 대표 벡터로 사용)
embedding1 = outputs1.last_hidden_state[:, 0, :].squeeze().numpy()  # .squeeze()로 차원 축소
embedding2 = outputs2.last_hidden_state[:, 0, :].squeeze().numpy()  # .squeeze()로 차원 축소

# 코사인 유사도 계산
similarity = cosine_similarity([embedding1], [embedding2])

# 유사도 출력
print(f"두 텍스트 간 문맥 유사도: {similarity[0][0]}")



