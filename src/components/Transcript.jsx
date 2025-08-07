import { useState } from "react";
import rightarrow from '@/assets/images/rightarrow.svg';
import statusicon from '@/assets/images/status-icon.svg';
import generateicon from '@/assets/images/generate-icon.svg';
import planicon from '@/assets/images/plan-icon.svg';
import checkicon from '@/assets/images/checkicon.svg';
import Processing from '@/assets/images/processing.png';
import Generate from '@/assets/images/generate.png';
import plan from '@/assets/images/plan.png';
import copyplan from '@/assets/images/copy.png';


const baseUrl = import.meta.env.VITE_API_BASE_URL

function Transcript() {
  
  const [transcript, setTranscript] = useState("");
  const [source, setSource] = useState({firstUrlSource: "first url", secondUrlSource: "second url"});
  const [plan, setPlan] = useState([]);
  const [link, setLink] = useState("");
  const [loadingGenerate, setLoadingGenerate] = useState(false);
  const [loadingGeneratePlan, setLoadingGeneratePlan] = useState(false);
  const [isGenerateError, setIsGenerateError] = useState(false);
  const [isPlanError, setIsPlanError] = useState(false);
  const [generateError, setGenerateError] = useState("");
  const [generatePlanError, setGeneratePlanError] = useState("");
  const [status, setStatus] = useState({ message: [], isCompleted: false });
  const [progress, setProgress] = useState(0);
  const [progressSecond, setProgressSecond ] = useState(0)
  const [copyMessage, setCopyMessage] = useState({textCopyMessageOne: false, textCopyMessageSecond: false})


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
  console.log("pro", progress)
  const handleGenerate = () => {
    setTranscript("");
    setProgress(0)
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
          if(!isTranscriptStarted) {
            const proStr = chunk.split(",")?.[1]?.trim()
            setProgress(parseInt(proStr))
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
    setProgressSecond(0);
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
          if(!isTranscriptStarted) {
            const proStr = chunk.split(",")?.[1]?.trim()
            setProgressSecond(parseInt(proStr))
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
      body: JSON.stringify({ transcript: transcriptSecond }),
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

  const handleCopyAll = async (arr, key) => {

    const textToCopy = arr.join('\n')
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopyMessage(pre => ({...pre, [key]: true}));
      setTimeout(() => setCopyMessage(pre => ({...pre, [key]: false})), 800)
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <>
    
      <div className={`urlbox ${status.message?.length > 0 ? 'full-width-url' : ''}`}>
        {/* <h1>Convert Video To Text</h1> */}
        {/* <p>Enter a video link to generate a text-based plan of action</p> */} 
        {/* <label htmlFor="link">Video Link</label> */}
        <div className="search">
          <div className="serch-box">
            <div className="serch-wrap">
              <input
                type="url"
                placeholder="Enter your first url here..."
                value={link}
                onChange={(e) => {setLink(e.target.value);
                setSource(prev => ({...prev, firstUrlSource: e.target.value.split(".")[1] === "youtube" ? "youtube" : e.target.value.split(".")[1] === "loom" ? "loom" :
                   e.target.value.split(".")[1] === "awesomescreenshot" ? "awesome screenshot" : "first url"})); 
                }}
                required
              />
              <button onClick={handleGenerate} disabled={loadingGenerate || !link}>
                {loadingGenerate ? "Generating..." : "Generate"}
              <img src={rightarrow} />
            </button>
            </div>
            <p>Link a Zoom, YouTube, Loom, or screen recording. We turn it into accurate, structured text.
            </p>
                          {isGenerateError && <p className="error-msg "style={{ color: "red" }}>{generateError}</p>}                       
              {isPlanError && (
                <p style={{ color: "red" }}>{generatePlanError}</p>
              )}
            
          </div>

          <div className="serch-box">
          <div className="serch-wrap">
          <input
            type="url"
            placeholder="Enter your second url here..."
            value={linkSecond}
            onChange={(e) => {setLinkSecond(e.target.value);
              setSource(prev => ({...prev, secondUrlSource: e.target.value.split(".")[1] === "youtube" ? "youtube" : e.target.value.split(".")[1] === "loom" ? "loom" :
                   e.target.value.split(".")[1] === "awesomescreenshot" ? "awesome screenshot" : "second url"})); 
            }}
            required
          />
          <button onClick={handleGenerateSecond} disabled={loadingGenerateSecond || !linkSecond}>
            {loadingGenerateSecond ? "Generating..." : "Generate"}
          <img src={rightarrow} />
        </button>
        </div>
            <p>Link a Zoom, YouTube, Loom, or screen recording. We turn it into accurate, structured text.
            </p>
          {isGenerateErrorSecond && <p className="error-msg "style={{ color: "red" }}>{generateErrorSecond}</p>}
            {isPlanErrorSecond && (
                <p style={{ color: "red" }}>{generatePlanErrorSecond}</p>
              )}  
          </div>
        </div>
       
      </div>


     {(Array.isArray(status.message) && status.message?.length > 0 || Array.isArray(statusSecond.message) && statusSecond.message?.length > 0) && 
     <>
     <nav className="url-tabs">
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <button disabled={!status.message || status.message?.length === 0} className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">{source?.firstUrlSource} </button>
            <button disabled={!statusSecond.message || statusSecond.message?.length === 0} className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">{source.secondUrlSource}</button>
          </div>
      </nav>


      <div className="tab-content" id="nav-tabContent">
        <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
          <div className="genererated-content">
            <div className="row">
              {/* <div className="col-lg-12 col-md-12 col-sm-12 col-12 p-16">
                {Array.isArray(status.message) && status.message?.length > 0 && 
                  <div className="status g-div">
                <h3><img src={statusicon} />Status:</h3> 
                  <div className="scrollbar" id="style-4">
                <ul>
                  {status.message.map(m => m?.trim() ? <li>{m} <img src={checkicon} /> </li>: null)}
                </ul>
                </div>
              </div>
                }
              </div> */}
              <div className="col-lg-12 col-md-12 col-sm-12 col-12 p-16 pro-1">
                <div className="progress g-div">            
                    <h3><img src={Processing} />Processing:</h3>
                    <div className="progress-container">
                      <div className="progress-bar-wtap">
                        <div className="progress-bar" style={{ width: `${progress}%` }}>
                          {progress}%
                        </div>
                      </div>
                    </div>     
                </div>            
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-12 p-16">
                {transcript?.length > 0 && (
                <div className="generate-text g-div" >
                  <h3><img src={generateicon} />Generated Transcript (Streaming):</h3>
                <div className="scrollbar" id="style-4">
                  <p className="transcript">
                    {transcript}
                  </p>
                  </div>
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
                    <div className="scrollbar" id="style-4">
                  <ul className="plan-container">
                    {plan.map((value, index) => (
                      <li key={index}><img src={checkicon} />{value}</li>
                    ))}
                  </ul>
                  </div>
                    <button onClick={() => { handleCopyAll(plan, "textCopyMessageOne")}}> <img src={copyplan} />{copyMessage.textCopyMessageOne ? "Copied" :"Copy Plan of Action"}</button>
                </div>
              )}
              </div>
            </div>

          </div>
        </div>
        <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
              <div className="genererated-content">
            <div className="row">
              {/* <div className="col-lg-6 col-md-12 col-sm-12 col-12 p-16">
                {Array.isArray(statusSecond.message) && statusSecond.message?.length > 0 && 
                  <div className="status g-div">
                <h3><img src={statusicon} />Status:</h3> 
                <div className="scrollbar" id="style-4">
                <ul>
                  {statusSecond.message.map(m => m?.trim() ? <li>{m} <img src={checkicon} /> </li>: null)}
                </ul>
                </div>
              </div>
                }
              </div> */}
               <div className="col-lg-12 col-md-12 col-sm-12 col-12 p-16 pro-2">
                <div className="progress g-div">            
                    <h3><img src={Processing} />Processing:</h3>
                    <div className="progress-container">
                      <div className="progress-bar-wtap">
                        <div className="progress-bar" style={{ width: `${progressSecond}%` }}>
                          {progressSecond}%
                        </div>
                      </div>
                    </div>     
                </div>            
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-12 p-16">
                {transcriptSecond?.length > 0 && (
                <div className="generate-text g-div" >
                  <h3><img src={generateicon} />Generated Transcript (Streaming):</h3>
                <div className="scrollbar" id="style-4">
                  <p className="transcript">
                    {transcriptSecond}
                  </p>
                  </div>
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
                    <div className="scrollbar" id="style-4">
                  <ul className="plan-container">
                    {planSecond.map((value, index) => (
                      <li key={index}><img src={checkicon} />{value}</li>
                    ))}
                  </ul>
                  </div> <button onClick={() => { handleCopyAll(planSecond, "textCopyMessageSecond")}}><img src={copyplan} />{copyMessage.textCopyMessageSecond ? "Copied" :"Copy Plan of Action"}</button>                  
                </div>
              )}
              </div>
          </div>
          
              </div>
        </div> 
      </div>
      </>
      }
    
     

    </>
      
  );
}

export  { Transcript };
