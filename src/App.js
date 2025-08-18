import React, { useState } from "react";

export default function App() {
  const [ingredient, setIngredient] = useState("");
  const [result, setResult] = useState("");

  // For now, just simulate a response when you click the button
  function handleSubmit(e) {
    e.preventDefault();
    // Hardcoded substitution response:
    setResult(`If you don't have ${ingredient}, you can use applesauce or mashed banana!`);
  }

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h1>🥖 Baking Substitution Helper</h1>
      <p>Type in an ingredient you don’t have, and I’ll suggest a substitute.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter an ingredient"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
          style={{ padding: 8, fontSize: 16, width: 300 }}
          required
        />
        <button type="submit" style={{ padding: 8, marginLeft: 10, fontSize: 16 }}>
          Get Substitution
        </button>
      </form>

      {result && (
        <div style={{ marginTop: 20, backgroundColor: "#f0f0f0", padding: 15, borderRadius: 5 }}>
          <strong>Substitution Suggestion:</strong>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}