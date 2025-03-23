import sys
sys.path.append('C:/Users/82109/Desktop/데사캡디/KoBERT-Transformers')

from kobert_transformers.tokenization_kobert import KoBertTokenizer


def get_tokenizer():
    return KoBertTokenizer.from_pretrained("monologg/kobert")
