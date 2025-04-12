import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.text();
      })
      .then((data) => setMessage(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="App">
      <h1>Bitcamp 2025 Project Title Goes here .....</h1>
      {error ? (
        <p style={{ color: "red" }}>Error: {error}</p>
      ) : (
        <p>Backend says: {message}</p>
      )}
    </div>
  );
}

export default App;