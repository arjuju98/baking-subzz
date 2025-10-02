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

        # Enhanced system prompt with specific formatting instructions
        system_prompt = """You are a concise baking substitution expert. Follow these rules strictly:

1. Keep responses SHORT (2-3 sentences max)
2. Provide 1-2 best substitutions only
3. Include exact ratios (e.g., "1:1 ratio" or "3/4 cup instead of 1 cup")
4. Format like this:
   **Substitute:** [ingredient name]
   **Ratio:** [exact measurement]
   **Note:** [brief tip if needed]

5. No long explanations or multiple paragraphs
6. Be direct and practical"""

        # Call OpenAI API
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": f"What can I substitute for: {user_input}"}
            ],
            max_tokens=150,  # Limit response length
            temperature=0.3  # Lower temperature for more consistent, focused responses
        )

        ai_reply = response.choices[0].message.content
        return jsonify({"substitution": ai_reply})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(port=5000, debug=True)
