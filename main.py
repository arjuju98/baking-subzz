from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from openai import OpenAI

app = Flask(__name__)
CORS(app)

# Initialize OpenAI client with your API key
client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

@app.route("/substitute", methods=["POST"])
def substitute():
    try:
        data = request.get_json()
        user_input = data.get("user_input", "")

        if not user_input:
            return jsonify({"error": "No input provided"}), 400

        # Call OpenAI API
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a helpful assistant that suggests baking substitutions."},
                {"role": "user", "content": user_input}
            ]
        )

        ai_reply = response.choices[0].message.content
        return jsonify({"substitution": ai_reply})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(port=5000, debug=True)
