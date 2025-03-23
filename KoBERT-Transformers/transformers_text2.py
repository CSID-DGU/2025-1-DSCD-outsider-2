from transformers import AutoTokenizer, AutoModel
import torch
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

# KoSimCSE 모델 로드
model_name = "jhgan/ko-simcse-roberta"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModel.from_pretrained(model_name)

def get_sentence_embedding(text):
    inputs = tokenizer(text, return_tensors='pt', padding=True, truncation=True)
    with torch.no_grad():
        outputs = model(**inputs)
    return outputs.last_hidden_state.mean(dim=1).squeeze().numpy()

# 텍스트 입력
text1 = input("첫 번째 텍스트를 입력하세요: ")
text2 = input("두 번째 텍스트를 입력하세요: ")

# 문장 임베딩 생성
embedding1 = get_sentence_embedding(text1)
embedding2 = get_sentence_embedding(text2)

# 코사인 유사도 계산
similarity = cosine_similarity([embedding1], [embedding2])

print(f"두 문장의 문맥 유사도: {similarity[0][0]}")
