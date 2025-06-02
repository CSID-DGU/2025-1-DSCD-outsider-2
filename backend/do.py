# app.py
from flask import Flask, jsonify
from calculate_matching import (
    load_user_data_man,
    load_user_data_woman,
    select_choice_columns,
    select_text_columns,
    calculate_select,
    calculate_write,
    calculate_score,
    hungarian_matching
)

app = Flask(__name__)

@app.route('/run-matching')
def run_matching():
    df_man = load_user_data_man()
    df_woman = load_user_data_woman()
    df_man_select_ideal, df_man_select_self = select_choice_columns(df_man)
    df_woman_select_ideal, df_woman_select_self = select_choice_columns(df_woman)
    df_man_write = select_text_columns(df_man)
    df_woman_write = select_text_columns(df_woman)
    comparison_results = calculate_select(df_man_select_ideal, df_man_select_self, df_woman_select_ideal, df_woman_select_self)
    results_df = calculate_write(df_man_write, df_woman_write)
    real_results = calculate_score(comparison_results, results_df)
    final_matches = hungarian_matching(real_results)
    return final_matches.to_json(orient='records', force_ascii=False)

if __name__ == '__main__':
    app.run(debug=True)