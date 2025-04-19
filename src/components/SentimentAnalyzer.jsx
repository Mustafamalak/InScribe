import { useState } from "react";

const SentimentAnalyzer = () => {
  const [text, setText] = useState("");
  const [sentiment, setSentiment] = useState(null);
  const [score, setScore] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [shouldShake, setShouldShake] = useState(false);

  const analyzeSentiment = () => {
    if (!text.trim()) {
      setIsTouched(true);
      setShouldShake(true);
      setTimeout(() => setShouldShake(false), 500);
      return;
    }

    setIsAnalyzing(true);

    // Simulate AI analysis with a simple algorithm (would be replaced by API call)
    setTimeout(() => {
      // Simple sentiment detection based on keywords
      const lowerText = text.toLowerCase();
      let sentimentResult = "neutral";
      let scoreResult = 0;

      const positiveWords = [
        "love",
        "great",
        "excellent",
        "amazing",
        "good",
        "happy",
        "best",
        "wonderful",
        "fantastic",
      ];
      const negativeWords = [
        "hate",
        "terrible",
        "awful",
        "bad",
        "worst",
        "disappointing",
        "horrible",
        "poor",
        "angry",
      ];

      let positiveCount = 0;
      let negativeCount = 0;

      // Count positive and negative words
      positiveWords.forEach((word) => {
        const regex = new RegExp(`\\b${word}\\b`, "g");
        const matches = lowerText.match(regex);
        if (matches) positiveCount += matches.length;
      });

      negativeWords.forEach((word) => {
        const regex = new RegExp(`\\b${word}\\b`, "g");
        const matches = lowerText.match(regex);
        if (matches) negativeCount += matches.length;
      });

      // Calculate sentiment
      if (positiveCount > negativeCount) {
        sentimentResult = "positive";
        scoreResult = Math.min(
          0.9,
          0.5 + (positiveCount - negativeCount) * 0.1
        );
      } else if (negativeCount > positiveCount) {
        sentimentResult = "negative";
        scoreResult = Math.max(
          -0.9,
          -0.5 - (negativeCount - positiveCount) * 0.1
        );
      } else {
        sentimentResult = "neutral";
        scoreResult = 0;
      }

      setSentiment(sentimentResult);
      setScore(scoreResult);
      setIsAnalyzing(false);
    }, 1000);
  };

  return (
    <div className="glass-card" style={{ padding: "30px" }}>
      <h2 style={{ marginBottom: "20px" }}>Sentiment Analyzer</h2>

      <div>
        <textarea
          className="text1"
          onBlur={() => setIsTouched(true)}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to analyze sentiment..."
          style={{
            height: "150px",
            resize: "vertical",
            width: "100%",
            padding: "15px",
          }}
        />
        {isTouched && !text.trim() && (
          <p style={{ color: "red", fontSize: "0.8rem", marginTop: "5px" }}>
            *This field is required*
          </p>
        )}

        <button
          className="btn btn-primary"
          onClick={analyzeSentiment}
          disabled={isAnalyzing || !text.trim()}
          style={{ marginTop: "15px" }}
        >
          {isAnalyzing ? "Analyzing..." : "Analyze Sentiment"}
        </button>

        {sentiment && (
          <div
            className="glass-card animate-fadeIn"
            style={{
              marginTop: "20px",
              padding: "20px",
              backgroundColor:
                sentiment === "positive"
                  ? "rgba(6, 190, 119, 0.1)"
                  : sentiment === "negative"
                  ? "rgba(255, 99, 71, 0.1)"
                  : "rgba(127, 221, 255, 0.1)",
            }}
          >
            <h3 style={{ marginBottom: "10px" }}>Analysis Result</h3>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "15px",
              }}
            >
              <div className={`tag tag-${sentiment}`}>
                {sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}
              </div>

              <div style={{ fontSize: "14px" }}>Score: {score?.toFixed(2)}</div>
            </div>

            <p>
              {sentiment === "positive"
                ? "This text has a positive sentiment. The tone is favorable and conveys satisfaction or happiness."
                : sentiment === "negative"
                ? "This text has a negative sentiment. The tone is unfavorable and may express dissatisfaction or frustration."
                : "This text has a neutral sentiment. The tone is balanced or factual without strong emotion."}
            </p>

            <div style={{ marginTop: "15px" }}>
              <button
                className="btn btn-secondary"
                style={{ marginRight: "10px" }}
              >
                Generate Email Response
              </button>
              <button className="btn btn-accent">Save Feedback</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SentimentAnalyzer;
