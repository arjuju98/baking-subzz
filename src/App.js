import React, { useState } from "react";

function App() {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/substitute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_input: userInput }),
      });

      const data = await res.json();

      if (data.reply) {
        setResponse(data.reply);
      } else if (data.error) {
        setResponse(`Error: ${data.error}`);
      }
    } catch (err) {
      setResponse(`Error connecting to backend: ${err.message}`);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Baking Substitutions</h1>
      <input
        type="text"
        value={userInput}
        placeholder="Enter ingredient..."
        onChange={(e) => setUserInput(e.target.value)}
        style={{ padding: "8px", width: "250px", marginRight: "10px" }}
      />
      <button onClick={handleSubmit} style={{ padding: "8px 12px" }}>
        Get Substitution
      </button>

      <div style={{ marginTop: "20px" }}>
        {response && <p>{response}</p>}
      </div>
    </div>
  );
}

export default App;