import pandas as pd
from math import log

# 함수 정의
def tf(t, d):
    return d.count(t)

def df(t):
    return sum(t in doc for doc in docs)

def idf(t):
    return log(n / (df(t) + 1))

def tf_idf(t, d):
    return tf(t, d) * idf(t)

# 문서 정의

docs = [
    '저는 기력이 별로 없는 사람입니다.',
    ' 스트레스와 피로가 쌓일 때는 반려견과 함께 누워있음으로써 심신의 안정을 취합니다.',
    ' 강아지 중 특히 단모 치와와를 좋아합니다.',
    ' 저는 연락을 자주하지 않는 것을 선호합니다.',
    ' 자주 전화하는것을 별로 좋아하지 않습니다. ',
    '술 마시는 것을 별로 좋아하지 않습니다.',
    ' 기력이 별로 없기 때문입니다. ',
    '좋아하는 음식은 샤브샤브, 초밥, 국밥입니다.']


# 단어 목록 생성
voca = sorted(list(set(w for doc in docs for w in doc.split())))
print(f"단어 목록: {voca}\n")

n = len(docs)

# TF 계산
tf_list = [[tf(term, docs[i]) for term in voca] for i in range(n)]
tf_res = pd.DataFrame(tf_list, columns=voca)
print("[Term Frequency (TF)]")
print(tf_res, end='\n\n')

# IDF 계산
idf_list = [idf(term) for term in voca]
idf_res = pd.DataFrame(idf_list, index=voca, columns=['IDF'])
print("[Inverse Document Frequency (IDF)]")
print(idf_res, end='\n\n')

# TF-IDF 계산
tf_idf_list = [[tf_idf(term, docs[i]) for term in voca] for i in range(n)]
tfidf_res = pd.DataFrame(tf_idf_list, columns=voca)
print("[TF-IDF]")
print(tfidf_res)
