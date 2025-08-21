import React, { useState } from "react";

function App() {
  const [userInput, setUserInput] = useState("");
  const [substitution, setSubstitution] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubstitution("");

    try {
      const res = await fetch("http://127.0.0.1:5000/substitute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_input: userInput }),
      });

      const data = await res.json();

      if (data.substitution) {
        setSubstitution(data.substitution);
      } else if (data.error) {
        setSubstitution("⚠️ Error: " + data.error);
      }
    } catch (err) {
      setSubstitution("⚠️ Error connecting to backend");
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>🥖 Baking Subzz</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="What can I use instead of eggs in brownies?"
          style={styles.textarea}
        />
        <button type="submit" style={styles.button}>Get Substitution</button>
      </form>

      {loading && <p style={styles.loading}>👩‍🍳 Mixing up ideas...</p>}
      {substitution && <div style={styles.result}>{substitution}</div>}
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Trebuchet MS', sans-serif",
    padding: "2rem",
    maxWidth: "600px",
    margin: "auto",
    textAlign: "center",
  },
  header: {
    color: "#c65353",
  },
  form: {
    marginBottom: "1rem",
  },
  input: {
    width: "70%",
    padding: "0.5rem",
    marginRight: "0.5rem",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },
  button: {
    padding: "0.5rem 1rem",
    backgroundColor: "#c65353",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  loading: {
    marginTop: "1rem",
    color: "#666",
  },
  result: {
    marginTop: "1rem",
    padding: "1rem",
    backgroundColor: "#fff4f4",
    borderRadius: "8px",
    border: "1px solid #ffd6d6",
    textAlign: "left",
  },
  textarea: {
  width: "70%",
  minHeight: "3rem",
  padding: "0.5rem",
  marginRight: "0.5rem",
  borderRadius: "8px",
  border: "1px solid #ddd",
  fontFamily: "inherit",
  resize: "vertical", // user can drag to expand
  whiteSpace: "pre-wrap", // wraps text nicely
},
};

export default App;
