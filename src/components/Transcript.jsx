import { useState } from "react";
import rightarrow from '@/assets/images/rightarrow.svg';
import statusicon from '@/assets/images/status-icon.svg';
import generateicon from '@/assets/images/generate-icon.svg';
import planicon from '@/assets/images/plan-icon.svg';
import checkicon from '@/assets/images/checkicon.svg';


const baseUrl = import.meta.env.VITE_API_BASE_URL

function Transcript() {
  
  const [transcript, setTranscript] = useState("");
  const [plan, setPlan] = useState([]);
  const [link, setLink] = useState("");
  const [loadingGenerate, setLoadingGenerate] = useState(false);
  const [loadingGeneratePlan, setLoadingGeneratePlan] = useState(false);
  const [isGenerateError, setIsGenerateError] = useState(false);
  const [isPlanError, setIsPlanError] = useState(false);
  const [generateError, setGenerateError] = useState("");
  const [generatePlanError, setGeneratePlanError] = useState("");
  const [status, setStatus] = useState({ message: [], isCompleted: false });


  const [transcriptSecond, setTranscriptSecond] = useState("");
  const [planSecond, setPlanSecond] = useState([]);
  const [linkSecond, setLinkSecond] = useState("");
  const [loadingGenerateSecond, setLoadingGenerateSecond] = useState(false);
  const [loadingGeneratePlanSecond, setLoadingGeneratePlanSecond] = useState(false);
  const [isGenerateErrorSecond, setIsGenerateErrorSecond] = useState(false);
  const [isPlanErrorSecond, setIsPlanErrorSecond] = useState(false);
  const [generateErrorSecond, setGenerateErrorSecond] = useState("");
  const [generatePlanErrorSecond, setGeneratePlanErrorSecond] = useState("");
  const [statusSecond, setStatusSecond] = useState({ message: [], isCompleted: false });

  const handleGenerate = () => {
    setTranscript("");
    setPlan([]);
    setIsGenerateError(false);
    setIsPlanError(false);
    setGenerateError("");
    setGeneratePlanError("");
    setStatus({ message: [], isCompleted: false });
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
            setStatus(pre => ({...pre, message: [...pre.message, chunk ] }))
          }
          // Start streaming after TRANSCRIPT_START
          if (chunk.includes("TRANSCRIPT_START")) {
            isTranscriptStarted = true;
            // setStatus(pre => ({...pre, message: ""}))
            const afterStart = chunk.split("Transcript Start")[1];
            // setTranscript((prev) => prev + chunk);
          } else if (isTranscriptStarted && !isTranscriptEnded) {
            if (chunk.includes("TRANSCRIPT_END") || chunk.includes("Transcription completed")) {
              isTranscriptEnded = true;
              const beforeEnd = chunk.split("TRANSCRIPT_END")[0];
              setTranscript((prev) => prev + beforeEnd);
              setStatus(prev => ({ message: prev.message, isCompleted: true }));
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
         const jsonPart = err.message.replace("Error: ", "");
        const parsed = JSON.parse(jsonPart);
        const msg = parsed?.detail?.[0]?.msg || "Something went wrong";
        setGenerateError(msg);
        setStatus({ message: [], isCompleted: true });
        setLoadingGenerate(false);
      });
  };
  const handleGenerateSecond = () => {
    setTranscriptSecond("");
    setPlanSecond([]);
    setIsGenerateErrorSecond(false);
    setIsPlanErrorSecond(false);
    setGenerateErrorSecond("");
    setGeneratePlanErrorSecond("");
    setStatusSecond({ message: [], isCompleted: false });
    setLoadingGenerateSecond(true);

    fetch(`${baseUrl}/transcribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: linkSecond }),
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
            setStatusSecond(pre => ({...pre, message: [...pre.message, chunk ] }))
          }
          // Start streaming after TRANSCRIPT_START
          if (chunk.includes("TRANSCRIPT_START")) {
            isTranscriptStarted = true;
            // setStatus(pre => ({...pre, message: ""}))
            const afterStart = chunk.split("Transcript Start")[1];
            // setTranscript((prev) => prev + chunk);
          } else if (isTranscriptStarted && !isTranscriptEnded) {
            if (chunk.includes("TRANSCRIPT_END") || chunk.includes("Transcription completed")) {
              isTranscriptEnded = true;
              const beforeEnd = chunk.split("TRANSCRIPT_END")[0];
              setTranscriptSecond((prev) => prev + beforeEnd);
              setStatusSecond(prev => ({ message: prev.message, isCompleted: true }));
            } else {
              setTranscriptSecond((prev) => prev + chunk);
            }
          }
        }

        setLoadingGenerateSecond(false);
      })
      .catch((err) => {
        console.error("Transcription error:", err);
        setIsGenerateErrorSecond(true);
         const jsonPart = err.message.replace("Error: ", "");
        const parsed = JSON.parse(jsonPart);
        const msg = parsed?.detail?.[0]?.msg || "Something went wrong";
        setGenerateErrorSecond(msg);
        setStatusSecond({ message: [], isCompleted: true });
        setLoadingGenerateSecond(false);
      });
  };

  const handlePlanSecond = () => {
    setLoadingGeneratePlanSecond(true);
    setGeneratePlanErrorSecond("");

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
        setPlanSecond(data?.gen_task || []);
        setLoadingGeneratePlanSecond(false);
      })
      .catch((err) => {
        console.error("Plan generation error:", err);
        setIsPlanErrorSecond(true);
        const msg = err?.detail?.[0]?.msg || "Failed to generate plan.";
        setGeneratePlanErrorSecond(msg);
        setLoadingGeneratePlanSecond(false);
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
        const msg = err?.detail?.[0]?.msg || "Failed to generate plan.";
        setGeneratePlanError(msg);
        setLoadingGeneratePlan(false);
      });
  };

  return (
    <>
      <div className={`urlbox ${status.message?.length > 0 ? 'full-width-url' : ''}`}>

        
    

          

          {/* <h1>Convert Video To Text</h1> */}
          {/* <p>Enter a video link to generate a text-based plan of action</p> */}
          
          
            {/* <label htmlFor="link">Video Link</label> */}
            <div className="search">
              <div className="serch-wrap">
                <input
                  type="url"
                  placeholder="Paste your video URL here..."
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  required
                />
                <button onClick={handleGenerate} disabled={loadingGenerate || !link}>
                  {loadingGenerate ? "Generating..." : "Generate"}
                <img src={rightarrow} />
              </button>
              </div>
              <p>Try with YouTube, Zoom, Loom, or any video URL</p>
            </div>
        <div className="genererated-content">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-12 p-16">
              {Array.isArray(status.message) && status.message?.length > 0 && 
                <div className="status g-div">
              <h3><img src={statusicon} />Status:</h3> 
              <ul>
                {status.message.map(m => m?.trim() ? <li>{m} <img src={checkicon} /> </li>: null)}
              </ul>
            </div>
              }
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-12 p-16">
              {transcript?.length > 0 && (
              <div className="generate-text g-div" >
                <h3><img src={generateicon} />Generated Transcript (Streaming):</h3>
                <p className="transcript">
                  {transcript}
                </p>
                {transcript && (
                  <button onClick={handlePlan} disabled={loadingGeneratePlan || plan?.length > 0 || !status.isCompleted}>
                    {loadingGeneratePlan ? "Generating Plan..." : "Generate Plan"}
                  </button>
                )}
              </div>
            )}
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-12 p-16">
              {plan.length > 0 && (
              <div className="plan-section g-div">
                <h3><img src={planicon} />Plan of Action</h3>
                <ul className="plan-container">
                  {plan.map((value, index) => (
                    <li key={index}><img src={checkicon} />{value}</li>
                  ))}
                </ul>
              </div>
            )}
            </div>

          </div>
        

            {isGenerateError && <p className="error-msg "style={{ color: "red" }}>{generateError}</p>}
      
          


            {isPlanError && (
              <p style={{ color: "red" }}>{generatePlanError}</p>
            )}

          
          </div>
          </div>


      <div className={`urlbox ${statusSecond.message?.length > 0 ? 'full-width-url' : ''}`}>
    

          

          {/* <h1>Convert Video To Text</h1> */}
          {/* <p>Enter a video link to generate a text-based plan of action</p> */}
          
          
            {/* <label htmlFor="link">Video Link</label> */}
            <div className="search">
              <div className="serch-wrap">
                <input
                  type="url"
                  placeholder="Paste your video URL here..."
                  value={linkSecond}
                  onChange={(e) => setLinkSecond(e.target.value)}
                  required
                />
                <button onClick={handleGenerateSecond} disabled={loadingGenerateSecond || !linkSecond}>
                  {loadingGenerateSecond ? "Generating..." : "Generate"}
                <img src={rightarrow} />
              </button>
              </div>
              <p>Try with YouTube, Zoom, Loom, or any video URL</p>
            </div>
        <div className="genererated-content">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-12 p-16">
              {Array.isArray(statusSecond.message) && statusSecond.message?.length > 0 && 
                <div className="status g-div">
              <h3><img src={statusicon} />Status:</h3> 
              <ul>
                {statusSecond.message.map(m => m?.trim() ? <li>{m} <img src={checkicon} /> </li>: null)}
              </ul>
            </div>
              }
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-12 p-16">
              {transcriptSecond?.length > 0 && (
              <div className="generate-text g-div" >
                <h3><img src={generateicon} />Generated Transcript (Streaming):</h3>
                <p className="transcript">
                  {transcriptSecond}
                </p>
                {transcriptSecond && (
                  <button onClick={handlePlanSecond} disabled={loadingGeneratePlanSecond || planSecond?.length > 0 || !statusSecond.isCompleted}>
                    {loadingGeneratePlanSecond ? "Generating Plan..." : "Generate Plan"}
                  </button>
                )}
              </div>
            )}
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-12 p-16">
              {planSecond.length > 0 && (
              <div className="plan-section g-div">
                <h3><img src={planicon} />Plan of Action</h3>
                <ul className="plan-container">
                  {planSecond.map((value, index) => (
                    <li key={index}><img src={checkicon} />{value}</li>
                  ))}
                </ul>
              </div>
            )}
            </div>

          </div>
        

            {isGenerateErrorSecond && <p className="error-msg "style={{ color: "red" }}>{generateErrorSecond}</p>}
      
          


            {isPlanErrorSecond && (
              <p style={{ color: "red" }}>{generatePlanErrorSecond}</p>
            )}

          
          </div>
          </div>
    </>
      
  );
}

export  { Transcript };
