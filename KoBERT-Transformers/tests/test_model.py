import sys
sys.path.append('C:/Users/82109/Desktop/데사캡디/KoBERT-Transformers')

from kobert_transformers import get_distilkobert_lm, get_distilkobert_model, get_kobert_lm, get_kobert_model


def test_load_model():
    get_kobert_model()
    get_distilkobert_model()
    get_distilkobert_lm()
    get_kobert_lm()
