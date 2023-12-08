import React, { useState } from "react";
import axios from "axios";

function TextSummarizer() {
  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [historyData, setHistoryData] = useState(null);

  const handleTextSummarization = async () => {
    try {
      if (inputText.length < 250) {
        // If the input text is less than 250 characters, show an alert
        alert("Please enter more than 250 characters for summarization.");
        return;
      }
      setLoading(true);
      const response = await axios.post(
        "https://text-summary-gfa2-rohit-sama.vercel.app//summarize-text/v2",
        {
          text: inputText,
        }
      );
      setLoading(false);
      setSummary(response.data); // Assuming the response contains the summarized text
    } catch (error) {
      console.error("Error:", error);
      // Handle error if necessary
    }
  };

  const handleTextHistory = async () => {
    try {
      const response = await axios.get("https://text-summary-gfa2-rohit-sama.vercel.app//api-data"); // Fetching history data

      const extractedData = response.data.map((item) => ({
        text: item.text,
        summary: item.response.summary,
      }));
      setHistoryData(extractedData); // Storing fetched history data in state with only 'text' and 'summary'
    } catch (error) {
      console.error("Error fetching history:", error);
      // Handle error if necessary
    }
  };

  const handleClearHistory = async () => {
    try {
      setLoading(true);
      await axios.delete("https://text-summary-gfa2-rohit-sama.vercel.app//clear-history");
      setLoading(false);
      // Update or clear the state that holds the history data if needed
      setHistoryData();
      console.log("History data cleared successfully");
    } catch (error) {
      console.error("Error clearing history:", error);
      // Handle error if necessary
    }
  };

  return (
    <div>
      <textarea
        className="border-2 w-[100%] h-[20vh] text-center p-3 border-gray-500"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter text to summarize"
       
      />
      <br />
      <button className="m-4" onClick={handleTextSummarization}>
        Summarize Text
      </button>
      <button className="m-4" onClick={() => setSummary("")}>
        {" "}
        Clear Summary{" "}
      </button>
      <button className="m-4" onClick={handleTextHistory}>
        history
      </button>
      <button className="m-4" onClick={handleClearHistory}>
        Clear history
      </button>
      <br />



      
      {loading ? (
        <div className="text-gray-400 mt-3">Loading...</div>
      ) : historyData ? (
        <div>
          <h2 className="text-lg text-gray-200">History Data:</h2>
        </div>
      ) : (
        <div className="text-gray-400 mt-3">{summary.summary}</div>
      )}

      {historyData && (
        <div className="mt-5">
          <div>
            {historyData.map((item, index) => (
              <div key={index}>
                <p className="mt-20">
                  <strong>Text:</strong> {item.text}
                </p>
                <p className="mt-5">
                  <strong>Summary:</strong> {item.summary}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default TextSummarizer;
