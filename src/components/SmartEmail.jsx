import { useState } from "react";

const SmartEmail = () => {
  const [subject, setSubject] = useState("");
  const [emailContent, setEmailContent] = useState("");
  const [category, setCategory] = useState("informative");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedEmail, setGeneratedEmail] = useState(null);
  const [error, setError] = useState(false);

  const generateEmail = () => {
    if (!emailContent.trim()) {
      setError(true);
      return;
    }

    setIsGenerating(true);
    setError(false);

    // Simulate AI generation (would be replaced by API call)
    setTimeout(() => {
      // Detect sentiment
      const lowerText = emailContent.toLowerCase();
      let sentiment = "neutral";

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
        sentiment = "positive";
      } else if (negativeCount > positiveCount) {
        sentiment = "negative";
      } else {
        sentiment = "neutral";
      }

      // Generate response based on sentiment and category
      let responseSubject = "";
      let responseBody = "";

      if (subject) {
        responseSubject = `Re: ${subject}`;
      } else {
        if (sentiment === "positive") {
          responseSubject = "Thank you for your positive feedback";
        } else if (sentiment === "negative") {
          responseSubject = "Regarding your concerns";
        } else {
          responseSubject = "Response to your message";
        }
      }

      if (sentiment === "positive") {
        responseBody = `Dear Customer,\n\nThank you for your positive message. We're delighted to hear that you had a great experience.\n\nYou wrote:\n"${emailContent}"\n\nWe appreciate your kind words and look forward to continuing to exceed your expectations.\n\nBest regards,\nThe InScribe AI Team`;
      } else if (sentiment === "negative") {
        responseBody = `Dear Customer,\n\nThank you for sharing your concerns with us. We're sorry to hear about your experience.\n\nYou wrote:\n"${emailContent}"\n\nWe take your feedback seriously and would like to address these issues promptly. Please let us know how we can improve your experience.\n\nSincerely,\nThe InScribe AI Team`;
      } else {
        responseBody = `Dear Customer,\n\nThank you for your message. We appreciate you taking the time to reach out to us.\n\nYou wrote:\n"${emailContent}"\n\nIf you have any further questions or need additional assistance, please don't hesitate to contact us.\n\nRegards,\nThe InScribe AI Team`;
      }

      setGeneratedEmail({
        subject: responseSubject,
        body: responseBody,
        sentiment,
        category,
      });

      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="glass-card" style={{ padding: "30px" }}>
      <h2 style={{ marginBottom: "20px" }}>Smart Email Assistant</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <div>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Subject (optional)
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Email subject"
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Message Content
          </label>
          <textarea
            value={emailContent}
            onChange={(e) => {
              setEmailContent(e.target.value);
              if (error && e.target.value.trim()) {
                setError(false);
              }
            }}
            placeholder="Enter customer message to generate a response..."
            style={{
              height: "120px",
              resize: "vertical",
              border: error ? "2px solid #ff4444" : "1px solid #ccc",
              animation: error ? "shake 0.5s" : "none",
            }}
          />
          {error && (
            <div
              style={{ color: "#ff4444", fontSize: "0.8rem", marginTop: "5px" }}
            >
              This is a required field
            </div>
          )}
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="urgent">Urgent</option>
            <option value="informative">Informative</option>
            <option value="promotional">Promotional</option>
          </select>
        </div>

        <button
          className="btn btn-primary"
          onClick={generateEmail}
          disabled={isGenerating || !emailContent.trim()}
        >
          {isGenerating ? "Generating Response..." : "Generate AI Response"}
        </button>

        {generatedEmail && (
          <div
            className="glass-card animate-fadeIn"
            style={{ marginTop: "15px", padding: "20px" }}
          >
            <h3 style={{ marginBottom: "15px" }}>Generated Email Response</h3>

            <div style={{ marginBottom: "10px", display: "flex", gap: "10px" }}>
              <div className={`tag tag-${generatedEmail.sentiment}`}>
                {generatedEmail.sentiment.charAt(0).toUpperCase() +
                  generatedEmail.sentiment.slice(1)}
              </div>

              <div className={`tag tag-${generatedEmail.category}`}>
                {generatedEmail.category.charAt(0).toUpperCase() +
                  generatedEmail.category.slice(1)}
              </div>
            </div>

            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                padding: "15px",
                borderRadius: "8px",
                marginBottom: "15px",
              }}
            >
              <div style={{ marginBottom: "10px" }}>
                <strong>Subject:</strong> {generatedEmail.subject}
              </div>
              <div style={{ whiteSpace: "pre-line" }}>
                <strong>Message:</strong>
                <br />
                {generatedEmail.body}
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button className="btn btn-secondary">Edit Response</button>
              <button className="btn btn-accent">Send Email</button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          10%,
          30%,
          50%,
          70%,
          90% {
            transform: translateX(-5px);
          }
          20%,
          40%,
          60%,
          80% {
            transform: translateX(5px);
          }
        }
      `}</style>
    </div>
  );
};

export default SmartEmail;
