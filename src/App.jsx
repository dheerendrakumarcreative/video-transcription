import { useState } from "react";

const baseUrl = "http://127.0.0.1:8000/api/v1"

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
  const [intervalTime, setIntervalTime] = useState(1000);

  const handleGenerate = () => {
    setStatus((pre => ({...pre, isCompleted: true, message: ""})))
    setIsGenerateError(false);
    setIsPlanError(false);
    setLoadingGenerate(true);
    setGenerateError("");
    setGeneratePlanError("");
    setTranscript("");
    setPlan([]);
    findStatus();
    fetch(`${baseUrl}/transcribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: link }),
    })
      .then(async (res) => {
        const data = await res.json(); // always read the body
        if (!res.ok) {
          throw data; // throw the error response so it goes to catch
        }
        return data;
      })
      .then((data) => {
        console.log(data);
        setTranscript(data?.transcript || "");
        setLoadingGenerate(false);
      })
      .catch((err) => {
        console.error("Transcription error:", err);
        setIsGenerateError(true);
        const msg = (typeof err?.detail === "string" && err?.detail) || err?.message || "Something went wrong";
        setGenerateError(msg);
        setLoadingGenerate(false);
      });
  };

  const handlePlan = () => {
    setLoadingGeneratePlan(true);
    setGeneratePlanError(""); // Clear previous error

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
        console.log(data);
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

  function findStatus() {
    setStatus((pre) => ({...pre, isCompleted: false}))
    const intervalId = setInterval(async () => {
      try {
        const response = await fetch(`${baseUrl}/status-update`);
        const data = await response.json();
        if (!response.ok) {
          throw data;
        }
        if(data?.source === "loom" || data?.source === "awesomess")
        setIntervalTime(5000)
        setStatus((pre) => ({...pre, message: data?.step}))
        console.log("Polled data:", data);

        if (data?.step === 'All steps completed') {
          console.log("Polling complete.");
          // setStatus((pre) => ({...pre, isCompleted: true, message: ""}))
          clearInterval(intervalId);
        }
      } catch (error) {
        console.error("Polling error:", error);
        setStatus((pre) => ({...pre, isCompleted: true}))
      }
    }, intervalTime);
  }
  console.log(status)
  return (
    <div className="box">
      <div>
        {!status.isCompleted && <div className="status"> <b>Status:</b> {status.message} </div>}
        <h1>Convert Video To Text</h1>
        <p>Enter a video link to generate a text-based plan of action</p>
        <div className="container">
          <label htmlFor="link">Video Link</label>
          <div className="search">
            <input
              type="text"
              placeholder="Enter link"
              value={link}
              onChange={(e) => {
                setLink(e.target.value);
              }}
            />
            <button onClick={handleGenerate} disabled={loadingGenerate}>
              {loadingGenerate ? "Generating..." : "Generate"}
            </button>
          </div>

          {isGenerateError && <p style={{ color: "red" }}>{generateError}</p>}
          {transcript?.length > 0 && (
            <div>
              <b>Generated Text</b>
              <p className="transcript">{transcript}</p>
            </div>
          )}

          {transcript?.length !== 0 && (
            <button onClick={handlePlan} disabled={loadingGeneratePlan}>
              {loadingGeneratePlan ? "Generating Plan..." : "Generate Plan"}
            </button>
          )}

          {isPlanError && <p style={{ color: "red" }}>{generatePlanError}</p>}
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
