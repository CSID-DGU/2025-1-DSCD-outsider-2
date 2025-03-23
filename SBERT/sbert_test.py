import os
os.environ["CUDA_VISIBLE_DEVICES"] = "-1"  # GPU 사용 안 하도록 설정

from sentence_transformers import SentenceTransformer, util

# 모델을 CPU 모드로 불러오기
model = SentenceTransformer("snunlp/KR-SBERT-V40K-klueNLI-augSTS", device='cpu')


# 긴 텍스트 입력
text1 = input("첫 번째 텍스트를 입력하세요: ")
text2 = input("두 번째 텍스트를 입력하세요: ")

# 문장 임베딩 변환
embedding1 = model.encode(text1, convert_to_tensor=True)
embedding2 = model.encode(text2, convert_to_tensor=True)

# 코사인 유사도 계산
cosine_score = util.pytorch_cos_sim(embedding1, embedding2)

# 결과 출력
print(f"\n문맥 유사도: {cosine_score.item():.4f}")
