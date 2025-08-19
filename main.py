import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import openai

app = Flask(__name__)
CORS(app)  # enable CORS for React frontend

openai.api_key = os.getenv("OPENAI_API_KEY")  # make sure this is set

@app.route("/substitute", methods=["POST"])
def substitute():
    data = request.get_json()
    user_input = data.get("user_input", "").strip()

    if not user_input:
        return jsonify({"error": "No input provided"}), 400

    try:
        response = openai.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are an expert baking assistant that suggests ingredient substitutions in a clear, concise way."},
                {"role": "user", "content": user_input},
            ],
            max_tokens=200,
        )

        ai_reply = response.choices[0].message.content.strip()
        return jsonify({"reply": ai_reply})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
