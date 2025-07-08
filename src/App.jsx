import { useState } from "react";

const baseUrl = import.meta.env.VITE_BASE_URL;

function App() {
  const [transcript, setTranscript] = useState("");
  const [plan, setPlan] = useState([]);
  const [link, setLink] = useState("");
  const [loadingGenerate, setLoadingGenerate] = useState(false);
  const [loadingGeneratePlan, setLoadingGeneratePlan] = useState(false);
  const [generateError, setGenerateError] = useState("");
  const [generatePlanError, setGeneratePlanError] = useState("");

  const handleGenerate = () => {
  setLoadingGenerate(true);
  setGenerateError("");
  setGeneratePlanError("")
  setTranscript("")
  setPlan([]);
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
      const msg =
        err?.detail?.[0]?.msg || err?.message || "Something went wrong";
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
      const msg =
        err?.detail || "Failed to generate plan.";
      setGeneratePlanError(msg);
      setLoadingGeneratePlan(false);
    });
};


  return (
    <div className="box">
      <div>
        <h1>Convert Video To Text</h1>
        <p>Enter a video link to generate a text-based plan of action</p>
        <div className="container">
          <label htmlFor="link">Video Link</label>
          <div className="search">
            <input
              type="text"
              placeholder="Enter link"
              value={link}
              onChange={(e) => {setLink(e.target.value)}}
            />
            <button onClick={handleGenerate} disabled={loadingGenerate}>
              {loadingGenerate ? "Generating..." : "Generate"}
            </button>
          </div>

          {generateError?.length > 0 && (
            <p style={{ color: "red" }}>{generateError}</p>
          )}
          {transcript?.length > 0 &&
          <div>
            <b>Generated Text</b>
            <p className="transcript">{transcript}</p>
          </div>
          }

          {transcript?.length !== 0 && <button onClick={handlePlan} disabled={loadingGeneratePlan}>
            {loadingGeneratePlan ? "Generating Plan..." : "Generate Plan"}
          </button> }

          {generatePlanError?.length > 0 && (
            <p style={{ color: "red" }}>{generatePlanError}</p>
          )}
          {plan.length > 0 &&<div className="plan-section">
            <b>Plan of Action</b>
            <ul className="plan-container">
              {plan.map((value, index) => (
                <li key={index}>{value}</li>
              ))}
            </ul>
          </div>}
        </div>
      </div>
    </div>
  );
}

export default App;
