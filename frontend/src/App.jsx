import { useState } from "react";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [sentiment, setSentiment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analyzeSentiment = async () => {
    if (!text) {
      setError("Please enter some text.");
      setSentiment("");
      return;
    }

    setLoading(true);
    setError("");
    setSentiment("");

    try {
      const response = await axios.post("http://localhost:8000/analyze", { text });
      console.log(response.data.sentimentResult[0].label);
      setSentiment(response.data.sentimentResult[0].label);
    } catch (err) {
      setError(`Failed to fetch sentiment. Try again. Error: ${err.message}`);
    } finally {
      setLoading(false);
      setText(""); // Clears input after processing
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-pink-500 p-4">
      <div className="bg-white bg-opacity-20 p-6 rounded-lg shadow-lg w-full max-w-2xl backdrop-blur-md">
        <h1 className="text-3xl font-semibold text-white text-center mb-4">
          Sentiment Analysis
        </h1>
        <input
          className="w-full p-2 border rounded-md bg-transparent text-black placeholder-white focus:outline-none focus:ring-2 focus:ring-pink-400"
          type="text"
          placeholder="Enter text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className="w-20 mt-6 bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600 transition"
          onClick={analyzeSentiment}
          disabled={loading}
        >
          {loading ? "Processing..." : "Process"}
        </button>
        {sentiment && (
          <p className={`mt-4 text-2xl font-medium text-center ${sentiment === "POSITIVE" ? "text-blue-600" : "text-black"}`}>
            Sentiment: {sentiment}
          </p>
        )}
        {error && (
          <p className="mt-4 text-lg font-medium text-center text-red-600">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
