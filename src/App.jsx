import { useState } from "react";

const baseUrl = "http://127.0.0.1:8001/api/v1";

function App() {
  const [transcript, setTranscript] = useState("");
  const [plan, setPlan] = useState([]);
  const [link, setLink] = useState("");
  const [loadingGenerate, setLoadingGenerate] = useState(false);
  const [loadingGeneratePlan, setLoadingGeneratePlan] = useState(false);
  const [isGenerateError, setIsGenerateError] = useState(false);
  const [isPlanError, setIsPlanError] = useState(false);
  const [generateError, setGenerateError] = useState("");
  const [generatePlanError, setGeneratePlanError] = useState("");
  const [status, setStatus] = useState({ message: "", isCompleted: true });

  const handleGenerate = () => {
    setTranscript("");
    setPlan([]);
    setIsGenerateError(false);
    setIsPlanError(false);
    setGenerateError("");
    setGeneratePlanError("");
    setStatus({ message: "", isCompleted: false });
    setLoadingGenerate(true);

    fetch(`${baseUrl}/transcribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: link }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(errorText);
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();

        let isTranscriptStarted = false;
        let isTranscriptEnded = false;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const chunk = decoder.decode(value, { stream: true });
          console.log("Chunk:", chunk);
          if(!isTranscriptStarted) {
            setStatus(pre => ({...pre, message: pre.message + " " + chunk + " ✅"}))
          }
          // Start streaming after TRANSCRIPT_START
          if (chunk.includes("TRANSCRIPT_START")) {
            isTranscriptStarted = true;
            setStatus(pre => ({...pre, message: ""}))
            const afterStart = chunk.split("TRANSCRIPT_START")[1];
            // setTranscript((prev) => prev + chunk);
          } else if (isTranscriptStarted && !isTranscriptEnded) {
            if (chunk.includes("TRANSCRIPT_END")) {
              isTranscriptEnded = true;
              const beforeEnd = chunk.split("TRANSCRIPT_END")[0];
              setTranscript((prev) => prev + beforeEnd);
              setStatus({ message: "Transcription completed!", isCompleted: true });
            } else {
              setTranscript((prev) => prev + chunk);
            }
          }
        }

        setLoadingGenerate(false);
      })
      .catch((err) => {
        console.error("Transcription error:", err);
        setIsGenerateError(true);
        const msg = err?.message || "Something went wrong";
        setGenerateError(msg);
        setStatus({ message: "", isCompleted: true });
        setLoadingGenerate(false);
      });
  };

  const handlePlan = () => {
    setLoadingGeneratePlan(true);
    setGeneratePlanError("");

    fetch(`${baseUrl}/action_points`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ transcript }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw data;
        }
        return data;
      })
      .then((data) => {
        setPlan(data?.gen_task || []);
        setLoadingGeneratePlan(false);
      })
      .catch((err) => {
        console.error("Plan generation error:", err);
        setIsPlanError(true);
        const msg = err?.detail || "Failed to generate plan.";
        setGeneratePlanError(msg);
        setLoadingGeneratePlan(false);
      });
  };

  return (
    <div className="box">
      <div>
        {!status.isCompleted && status.message && (
          <div className="status">
            <b>Status:</b> {status.message}
          </div>
        )}

        <h1>Convert Video To Text</h1>
        <p>Enter a video link to generate a text-based plan of action</p>
        <div className="container">
          <label htmlFor="link">Video Link</label>
          <div className="search">
            <input
              type="text"
              placeholder="Enter link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
            <button onClick={handleGenerate} disabled={loadingGenerate}>
              {loadingGenerate ? "Generating..." : "Generate"}
            </button>
          </div>

          {isGenerateError && <p style={{ color: "red" }}>{generateError}</p>}

          {transcript?.length > 0 && (
            <div>
              <b>Generated Transcript (Streaming):</b>
              <p className="transcript">
                {transcript}
              </p>
            </div>
          )}

          {transcript && (
            <button onClick={handlePlan} disabled={loadingGeneratePlan}>
              {loadingGeneratePlan ? "Generating Plan..." : "Generate Plan"}
            </button>
          )}

          {isPlanError && (
            <p style={{ color: "red" }}>{generatePlanError}</p>
          )}

          {plan.length > 0 && (
            <div className="plan-section">
              <b>Plan of Action</b>
              <ul className="plan-container">
                {plan.map((value, index) => (
                  <li key={index}>{value}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
