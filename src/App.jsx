import { Transcript } from "./components/Transcript.jsx";
import logo from '@/assets/images/cbc-logo.svg';
import play from '@/assets/images/play.svg';
import autoTranscribe from '@/assets/images/auto.svg';
import SmartMeeting from '@/assets/images/smartmetting.svg';
import ActionPlan from '@/assets/images/actionplan.svg';
import stepOne from '@/assets/images/step-one.svg';
import stepTwo from '@/assets/images/step-two.svg';
import stepThree from '@/assets/images/step-three.svg';
import ContactIcon from '@/assets/images/contact-icon.svg';
import CloseIcon from '@/assets/images/close.svg';
import GreenArrowup from '@/assets/images/up.svg';
import GreenArrowdown from '@/assets/images/down.svg';
import Processing from '@/assets/images/processing.png';
import Generate from '@/assets/images/generate.png';
import plan from '@/assets/images/plan.png';
import tryitfree from '@/assets/images/tryitfree.svg';
 

import { motion } from "motion/react"
import { useEffect, useRef, useState } from "react";
import { li } from "motion/react-client";


export default function App() {

  const tabRef = useRef(null)
  const inputRef = useRef(null);
  const [show, setShow] = useState({
      showInpupts: false,
      showDataOne: false,
      showDataSecond: false,
      ShowPlanOne: false,
      showPlanSecond: false,
    });
  const [link, setLink] =useState({linkOne: "", linkTwo: ""});
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  const [progressOne, setProgressOne] = useState(1);
  const [progressSecond, setProgressSecond] = useState(1);

  useEffect(() => {
    if(!show.showDataOne) return;
    const timer = setInterval(() => {
      setProgressOne(prev => {
        if (prev < 100) {
          return prev + 2;
        } else {
          clearInterval(timer);
          return 100;
        }
      });
    }, 300); 

    return () => clearInterval(timer); 
  }, [show.showDataOne]);

  useEffect(() => {
    if(!show.showDataSecond) return;
    const timer = setInterval(() => {
      setProgressSecond(prev => {
        if (prev < 100) {
          return prev + 2;
        } else {
          clearInterval(timer);
          return 100;
        }
      });
    }, 300); 

    return () => clearInterval(timer); 
  }, [show.showDataSecond]);

  function isValidURL(url) {
    console.log("Validating URL:", url);
  if (typeof url !== 'string' || url.trim() === '') return false;

  try {
    const parsed = new URL(url);
    return ['http:', 'https:'].includes(parsed.protocol) && !!parsed.hostname;
  } catch (err) {
    return false;
  }
}

const handleInputScroll = () => { 
  setShow((pre) => ({...pre, showInpupts: true}))
  console.log("width",window.innerWidth)
  if(window.innerWidth < 1024)
  setTimeout(() => {
   inputRef?.current?.scrollIntoView({ behavior: 'smooth' }); 
   }, 700); 
}

  return (
    <>
 
      {/* header starts here */}
       
      {/* banner starts here */}
      <section className={`banner-section p-140 ${show.showDataOne || show.showDataSecond ? "b-expanded" : ""}`} >
        <div className="container">
          <div className="text-center">        
            <motion.div  variants={fadeInUp} initial="hidden" whileInView="visible"viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.6, delay: .2 }}>
              <a href="https://creativebuffer.com/" target="_blank" className="logo" >
                <img src={logo} />                 
              </a>
            </motion.div>
            <motion.h1  variants={fadeInUp} initial="hidden" whileInView="visible"viewport={{ once: true, amount: 0.6 }} transition={{ duration: 0.6, delay: .4 }}>From Video to <span>Victory</span>:<br />Turn Meetings Into Clear Action Plans</motion.h1>
            <motion.p  variants={fadeInUp} initial="hidden" whileInView="visible"viewport={{ once: true, amount: 0.8 }} transition={{ duration: 0.6, delay: .6 }} className="subheadng">Effortlessly convert YouTube, Zoom, Loom, and screen recordings into searchable transcripts, smart summaries, and actionable to-do lists.</motion.p>

            <motion.div  variants={fadeInUp} initial="hidden" whileInView="visible"viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, delay: .8 }} className="banner-cta-btn">
              <a href="#" className="tryfree" onClick={handleInputScroll}>Try it Free</a>
              <button type="button" className="watchdemo" data-bs-toggle="modal" data-bs-target="#watchdemo" ><img src={play} />Watch Demo</button>
             </motion.div>
               <motion.div  className="tryitfree" variants={fadeInUp} initial="hidden" whileInView="visible"viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8, delay: 1 }}>            
               <img src={tryitfree} />
              </motion.div>

            <div className="urlbox ">
              {/* { show.showInpupts &&  */}
              
             <motion.div  className="search" variants={fadeInUp} initial="hidden" whileInView="visible"viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, delay: .5 }}>
                  <div className="serch-box">
                    <div className="serch-wrap">
                      <input placeholder="Enter your first url here..." required="" type="url" onChange={(e) => setLink((pre) => ({...pre, linkOne: e.target.value}))} value={link.linkOne}></input>
                      <button disabled={!isValidURL(link.linkOne)} onClick={() => { 

                        setShow(pre => ({...pre, showDataOne: true, showDataSecond: false}))
                        setTimeout(() => {
                          tabRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }, 500)
                      }}>Generate <img src="data:image/svg+xml,%3csvg%20
                            xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20stroke='currentColor'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'%20class='lucide%20lucide-arrow-right%20w-5%20h-5'%3e%3cpath%20d='M5%2012h14'%3e%3c/path%3e%3cpath%20d='m12%205%207%207-7%207'%3e%3c/path%3e%3c/svg%3e"></img>
                      </button>
                    </div>
                    <p>Link a Zoom, YouTube, Loom, or screen recording. We turn it into accurate, structured text.</p>
                  </div>
                  <div className="serch-box">
                    <div className="serch-wrap">
                      <input placeholder="Enter your second url here..." required="" type="url" onChange={(e) => setLink((pre) => ({...pre, linkTwo: e.target.value}))} value={link.linkTwo}></input>
                      <button disabled={!isValidURL(link.linkTwo)} onClick={() => setShow(pre => ({...pre, showDataSecond: true, showDataOne: false}))}>Generate <img src="data:image/svg+xml,%3csvg%20
                                xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20stroke='currentColor'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'%20class='lucide%20lucide-arrow-right%20w-5%20h-5'%3e%3cpath%20d='M5%2012h14'%3e%3c/path%3e%3cpath%20d='m12%205%207%207-7%207'%3e%3c/path%3e%3c/svg%3e"></img>
                      </button>
                    </div>
                    <p>Link a Zoom, YouTube, Loom, or screen recording. We turn it into accurate, structured text.</p>
                  </div>
                </motion.div>
              {/* } */}
              {(show.showDataOne || show.showDataSecond) &&
                <motion.div ref={tabRef}  variants={fadeInUp} initial="hidden" whileInView="visible"viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.6, delay: .1 }} className="generate-tab-wrap">
                  <nav className="url-tabs" id="url_tabs">
                  <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button disabled={!link.linkOne?.length} className={`nav-link ${show.showDataOne ? "active": ""}`} onClick={() => setShow(pre => ({...pre, showDataSecond: false, showDataOne: true}))}> First Tab</button>
                    <button disabled={!link.linkTwo?.length} className={`nav-link ${show.showDataSecond ? "active": ""}`} onClick={() => setShow(pre => ({...pre, showDataSecond: true, showDataOne: false}))}>Second Tab</button>
                  </div>
                  </nav>
                  <div className="tab-content" id="nav-tabContent">
                  <div className={`tab-pane fade show ${show.showDataOne ? "active": ""}`} >            
                    <div className="genererated-content">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-12 p-16">
                              <div className="progress g-div">            
                                 <h3><img src={Processing} />Processing:</h3>
                                  <div className="progress-container">
                                    <div className="progress-bar-wtap">
                                      <div className="progress-bar" style={{ width: `${progressOne}%` }}>
                                        {progressOne}%
                                      </div>
                                    </div>
                                  </div>     
                              </div>            
                            </div>
                            { show.showDataOne && progressOne === 100 && 
                              <div className="col-lg-12 col-md-12 col-sm-12 col-12 p-16">
                                  <div className="generate-text g-div">
                                      <h3><img src={Generate} />Generated Transcript (Streaming):</h3>
                                      <div className="scrollbar" id="style-4">
                                          <p className="transcript">I have already one recording this video to address the issue raised by ESA. So basically when we are talking about the all forms and get also I am considering this function for now. So initially what was happening is that we had no
                                              barrier on this query, this database query. So basically we were fetching all the all the records which were saved as draft. So maybe there is another API for fetching the staffing node where the saved draft is true. So my point
                                              is that we had no, I mean there was no restriction on fetching the database records. All the database records which were saved as false, they were getting returned to the employee. And as soon as the new requirement was introduced,
                                              we had applied this additional condition in order to return the staffing node basically to all the users which are assigned as the signers to this particular document. So the issue was happening from the, I mean initially also
                                              it was not impossible for one employee of one admin to see the, I mean basically the results of another admin. It was just a matter of this key if it was true. I mean you can also consider this API also, this was not added here.
                                              So all the records which were true, they were getting returned in this API and all the records which were saved as false, as saved draft as false, they were getting returned in this API. So there was no actually no restriction.
                                              So for now I have added this restriction. So this was the major issue which was, I mean this was the issue which was causing the employee of one admin to see the records of another admin. And I think we have no, I mean this part
                                              was developed by the previous team I guess. So that's all from my end. And thank you. Transcription completed
                                          </p>
                                      </div>
                                      <div className="gp-btn-wrap">                  
                                      <button disabled="" onClick={() => setShow(pre => ({...pre, ShowPlanOne: true}))}>Generate  Plan</button>
                                      </div>
                                  </div>
                              </div> 
                            }
                            {show.ShowPlanOne && 
                              <div className="col-lg-12 col-md-12 col-sm-12 col-12 p-16">
                                  <div className="plan-section g-div">
                                      <h3><img src={plan} />Plan of Action</h3>
                                      <div className="scrollbar" id="style-4">
                                          <ul className="plan-container">
                                              <li><img src="data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M22%2011.0801V12.0001C21.9988%2014.1565%2021.3005%2016.2548%2020.0093%2017.9819C18.7182%2019.7091%2016.9033%2020.9726%2014.8354%2021.584C12.7674%2022.1954%2010.5573%2022.122%208.53447%2021.3747C6.51168%2020.6274%204.78465%2019.2462%203.61096%2017.4372C2.43727%2015.6281%201.87979%2013.4882%202.02168%2011.3364C2.16356%209.18467%202.99721%207.13643%204.39828%205.49718C5.79935%203.85793%207.69279%202.71549%209.79619%202.24025C11.8996%201.76502%2014.1003%201.98245%2016.07%202.86011'%20stroke='%2364AE20'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M9%2011L12%2014L22%204'%20stroke='%2364AE20'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e"></img>Apply
                                                  a barrier on the database query to restrict fetching of records.</li>
                                              <li><img src="data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M22%2011.0801V12.0001C21.9988%2014.1565%2021.3005%2016.2548%2020.0093%2017.9819C18.7182%2019.7091%2016.9033%2020.9726%2014.8354%2021.584C12.7674%2022.1954%2010.5573%2022.122%208.53447%2021.3747C6.51168%2020.6274%204.78465%2019.2462%203.61096%2017.4372C2.43727%2015.6281%201.87979%2013.4882%202.02168%2011.3364C2.16356%209.18467%202.99721%207.13643%204.39828%205.49718C5.79935%203.85793%207.69279%202.71549%209.79619%202.24025C11.8996%201.76502%2014.1003%201.98245%2016.07%202.86011'%20stroke='%2364AE20'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M9%2011L12%2014L22%204'%20stroke='%2364AE20'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e"></img>Add
                                                  an additional condition to return staffing nodes to users assigned as signers.</li>
                                              <li><img src="data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M22%2011.0801V12.0001C21.9988%2014.1565%2021.3005%2016.2548%2020.0093%2017.9819C18.7182%2019.7091%2016.9033%2020.9726%2014.8354%2021.584C12.7674%2022.1954%2010.5573%2022.122%208.53447%2021.3747C6.51168%2020.6274%204.78465%2019.2462%203.61096%2017.4372C2.43727%2015.6281%201.87979%2013.4882%202.02168%2011.3364C2.16356%209.18467%202.99721%207.13643%204.39828%205.49718C5.79935%203.85793%207.69279%202.71549%209.79619%202.24025C11.8996%201.76502%2014.1003%201.98245%2016.07%202.86011'%20stroke='%2364AE20'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M9%2011L12%2014L22%204'%20stroke='%2364AE20'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e"></img>Consider
                                                  using an API to fetch staffing nodes where saved draft is true.</li>
                                              <li><img src="data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M22%2011.0801V12.0001C21.9988%2014.1565%2021.3005%2016.2548%2020.0093%2017.9819C18.7182%2019.7091%2016.9033%2020.9726%2014.8354%2021.584C12.7674%2022.1954%2010.5573%2022.122%208.53447%2021.3747C6.51168%2020.6274%204.78465%2019.2462%203.61096%2017.4372C2.43727%2015.6281%201.87979%2013.4882%202.02168%2011.3364C2.16356%209.18467%202.99721%207.13643%204.39828%205.49718C5.79935%203.85793%207.69279%202.71549%209.79619%202.24025C11.8996%201.76502%2014.1003%201.98245%2016.07%202.86011'%20stroke='%2364AE20'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M9%2011L12%2014L22%204'%20stroke='%2364AE20'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e"></img>Restrict
                                                  records returned to employees based on their admin assignment.</li>
                                              <li><img src="data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M22%2011.0801V12.0001C21.9988%2014.1565%2021.3005%2016.2548%2020.0093%2017.9819C18.7182%2019.7091%2016.9033%2020.9726%2014.8354%2021.584C12.7674%2022.1954%2010.5573%2022.122%208.53447%2021.3747C6.51168%2020.6274%204.78465%2019.2462%203.61096%2017.4372C2.43727%2015.6281%201.87979%2013.4882%202.02168%2011.3364C2.16356%209.18467%202.99721%207.13643%204.39828%205.49718C5.79935%203.85793%207.69279%202.71549%209.79619%202.24025C11.8996%201.76502%2014.1003%201.98245%2016.07%202.86011'%20stroke='%2364AE20'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M9%2011L12%2014L22%204'%20stroke='%2364AE20'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e"></img>Review
                                                  and update the existing API to include the necessary restrictions.</li>
                                          </ul>
                                      </div>
                                  </div>
                              </div>
                            }
                        </div>
                    </div>
                  </div>
                  
                  {show.showDataSecond  && 
                    <div className={`tab-pane fade show ${show.showDataSecond ? "active": ""}`}>
                      
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
                      <div className="genererated-content">
                          <div className="row">
                              {/* <div className="col-lg-12 col-md-12 col-sm-12 col-12 p-16">
                                <div className="progress g-div">
                                  </div>            
                              </div> */}
                              {progressSecond === 100 && 
                                <div className="col-lg-12 col-md-12 col-sm-12 col-12 p-16">
                                    <div className="generate-text g-div">
                                        <h3><img src={Generate} />Generated Transcript (Streaming):</h3>
                                        <div className="scrollbar" id="style-4">
                                            <p className="transcript">I have already one recording this video to address the issue raised by ESA. So basically when we are talking about the all forms and get also I am considering this function for now. So initially what was happening is that we had no
                                                barrier on this query, this database query. So basically we were fetching all the all the records which were saved as draft. So maybe there is another API for fetching the staffing node where the saved draft is true. So my point
                                                is that we had no, I mean there was no restriction on fetching the database records. All the database records which were saved as false, they were getting returned to the employee. And as soon as the new requirement was introduced,
                                                we had applied this additional condition in order to return the staffing node basically to all the users which are assigned as the signers to this particular document. So the issue was happening from the, I mean initially also
                                                it was not impossible for one employee of one admin to see the, I mean basically the results of another admin. It was just a matter of this key if it was true. I mean you can also consider this API also, this was not added here.
                                                So all the records which were true, they were getting returned in this API and all the records which were saved as false, as saved draft as false, they were getting returned in this API. So there was no actually no restriction.
                                                So for now I have added this restriction. So this was the major issue which was, I mean this was the issue which was causing the employee of one admin to see the records of another admin. And I think we have no, I mean this part
                                                was developed by the previous team I guess. So that's all from my end. And thank you. Transcription completed
                                            </p>
                                        </div>
                                        <div className="gp-btn-wrap">                  
                                        <button disabled="" onClick={() => setShow(pre => ({...pre, showPlanSecond: true}))}>Generate  Plan</button>
                                        </div>
                                    </div>
                                </div>
                              }
                              {show.showPlanSecond && 
                                <div className="col-lg-12 col-md-12 col-sm-12 col-12 p-16">
                                    <div className="plan-section g-div">
                                        <h3><img src="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20stroke='currentColor'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'%20class='lucide%20lucide-target%20section-icon'%3e%3ccircle%20cx='12'%20cy='12'%20r='10'%3e%3c/circle%3e%3ccircle%20cx='12'%20cy='12'%20r='6'%3e%3c/circle%3e%3ccircle%20cx='12'%20cy='12'%20r='2'%3e%3c/circle%3e%3c/svg%3e"></img>Plan of Action</h3>
                                        <div className="scrollbar" id="style-4">
                                            <ul className="plan-container">
                                                <li><img src="data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M22%2011.0801V12.0001C21.9988%2014.1565%2021.3005%2016.2548%2020.0093%2017.9819C18.7182%2019.7091%2016.9033%2020.9726%2014.8354%2021.584C12.7674%2022.1954%2010.5573%2022.122%208.53447%2021.3747C6.51168%2020.6274%204.78465%2019.2462%203.61096%2017.4372C2.43727%2015.6281%201.87979%2013.4882%202.02168%2011.3364C2.16356%209.18467%202.99721%207.13643%204.39828%205.49718C5.79935%203.85793%207.69279%202.71549%209.79619%202.24025C11.8996%201.76502%2014.1003%201.98245%2016.07%202.86011'%20stroke='%2364AE20'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M9%2011L12%2014L22%204'%20stroke='%2364AE20'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e"></img>Apply
                                                    a barrier on the database query to restrict fetching of records.</li>
                                                <li><img src="data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M22%2011.0801V12.0001C21.9988%2014.1565%2021.3005%2016.2548%2020.0093%2017.9819C18.7182%2019.7091%2016.9033%2020.9726%2014.8354%2021.584C12.7674%2022.1954%2010.5573%2022.122%208.53447%2021.3747C6.51168%2020.6274%204.78465%2019.2462%203.61096%2017.4372C2.43727%2015.6281%201.87979%2013.4882%202.02168%2011.3364C2.16356%209.18467%202.99721%207.13643%204.39828%205.49718C5.79935%203.85793%207.69279%202.71549%209.79619%202.24025C11.8996%201.76502%2014.1003%201.98245%2016.07%202.86011'%20stroke='%2364AE20'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M9%2011L12%2014L22%204'%20stroke='%2364AE20'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e"></img>Add
                                                    an additional condition to return staffing nodes to users assigned as signers.</li>
                                                <li><img src="data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M22%2011.0801V12.0001C21.9988%2014.1565%2021.3005%2016.2548%2020.0093%2017.9819C18.7182%2019.7091%2016.9033%2020.9726%2014.8354%2021.584C12.7674%2022.1954%2010.5573%2022.122%208.53447%2021.3747C6.51168%2020.6274%204.78465%2019.2462%203.61096%2017.4372C2.43727%2015.6281%201.87979%2013.4882%202.02168%2011.3364C2.16356%209.18467%202.99721%207.13643%204.39828%205.49718C5.79935%203.85793%207.69279%202.71549%209.79619%202.24025C11.8996%201.76502%2014.1003%201.98245%2016.07%202.86011'%20stroke='%2364AE20'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M9%2011L12%2014L22%204'%20stroke='%2364AE20'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e"></img>Consider
                                                    using an API to fetch staffing nodes where saved draft is true.</li>
                                                <li><img src="data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M22%2011.0801V12.0001C21.9988%2014.1565%2021.3005%2016.2548%2020.0093%2017.9819C18.7182%2019.7091%2016.9033%2020.9726%2014.8354%2021.584C12.7674%2022.1954%2010.5573%2022.122%208.53447%2021.3747C6.51168%2020.6274%204.78465%2019.2462%203.61096%2017.4372C2.43727%2015.6281%201.87979%2013.4882%202.02168%2011.3364C2.16356%209.18467%202.99721%207.13643%204.39828%205.49718C5.79935%203.85793%207.69279%202.71549%209.79619%202.24025C11.8996%201.76502%2014.1003%201.98245%2016.07%202.86011'%20stroke='%2364AE20'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M9%2011L12%2014L22%204'%20stroke='%2364AE20'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e"></img>Restrict
                                                    records returned to employees based on their admin assignment.</li>
                                                <li><img src="data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M22%2011.0801V12.0001C21.9988%2014.1565%2021.3005%2016.2548%2020.0093%2017.9819C18.7182%2019.7091%2016.9033%2020.9726%2014.8354%2021.584C12.7674%2022.1954%2010.5573%2022.122%208.53447%2021.3747C6.51168%2020.6274%204.78465%2019.2462%203.61096%2017.4372C2.43727%2015.6281%201.87979%2013.4882%202.02168%2011.3364C2.16356%209.18467%202.99721%207.13643%204.39828%205.49718C5.79935%203.85793%207.69279%202.71549%209.79619%202.24025C11.8996%201.76502%2014.1003%201.98245%2016.07%202.86011'%20stroke='%2364AE20'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M9%2011L12%2014L22%204'%20stroke='%2364AE20'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e"></img>Review
                                                    and update the existing API to include the necessary restrictions.</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div> 
                              }
                          </div>
                      </div>
                    </div> 
                  }
                  </div>
                </motion.div>
              }
            </div>
          </div>
        </div>
      </section>

     
      {/* keyfeature starts here     */}
      <section className="keyfeature-section">
        <div className="container" >
          <motion.div className="text-center subheading" initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: .3 }}
            viewport={{ once: true }}>
            <h2>Key Features</h2>
            <p>Transform your video content into actionable insights with our powerful AI-driven tools</p>
          </motion.div>
          <div className="row">

            <div className="col-lg-4 col-md-12 col-sm-12 col-12 p-16">
              <motion.div className="keyf-card" whileInView={{ opacity: 1, y: 0 }}
                 initial={{ opacity: 0, y: 50 }}
              
                transition={{ duration: 0.4, delay: .6 }}
                viewport={{ once: true }}>
                <figure>
                  <img src={autoTranscribe} />
                </figure>
                <h3>Smart Meeting Summaries</h3>
                <p>AI-powered summaries that capture what really matters without the fluff.</p>
              </motion.div>
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12 col-12 p-16">
              <motion.div className="keyf-card" whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 50 }}
                
                transition={{ duration: 0.4, delay: .9 }}
                viewport={{ once: true }}>
                <figure>
                  <img src={SmartMeeting} />
                </figure>
                <h3>Action Plan Generator</h3>
                <p>We extract decisions, deadlines, tasks, and owner responsibilities into a crisp plan of action.</p>
              </motion.div>
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12 col-12 p-16">
              <motion.div className="keyf-card" whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 50 }}
               
                transition={{ duration: 0.4, delay: 1.5 }}
                viewport={{ once: true }}>
                <figure>
                  <img src={ActionPlan} />
                </figure>
                <h3>Auto-Transcribe Any Video</h3>
                <p>Link a Zoom, YouTube, Loom, or screen recording. We turn it into accurate, structured text.</p>
              </motion.div>
            </div>

          </div>
        </div>
      </section>
      {/* generate url starts here     */}
      {/* <section id="generate-section" className="p-80">
        <div className="container" >
          <motion.div className="text-center subheading" whileInView={{ opacity: 1, y: 0 }}
             initial={{ opacity: 0, y: 50 }}
            
            transition={{ duration: 0.4, delay: .5 }}
            viewport={{ once: true }}>
            <h2>Turn Your Videos into Text</h2>
            <p>Three simple steps to transform your videos into actionable insights</p>
          </motion.div>
          <motion.div initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: .5, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.5 }}>
            <Transcript />

          </motion.div>
        </div>
      </section> */}
      {/* how its works starts here     */}
      <section className="howitswork-section grey-bg p-80">
        <div className="container">
          <motion.div className="text-center subheading" 
          whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 50 }}            
            transition={{ duration: 0.4, delay:.5 }}
            viewport={{ once: true }}>
            <h2>How It Works</h2>
            <p>Three simple steps to transform your videos into actionable insights</p>
          </motion.div>
          <motion.div 
           initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay:.8 }}
             viewport={{ once: true, amount: 0.5 }}>
              <div className="row relative">
            <div className="col-lg-4 col-md-12 col-sm-12 col-12 p-16 relative">
              {/* <div className="steptext">01</div> */}
              <div className="step">
                <figure className="bg-blue">
                  <img src={stepOne} />
                </figure>
                <h3>Paste Link</h3>
                <p>Add your Zoom, Loom, YouTube, or Awesome Screenshot video</p>
                <img className="greennormalarrow" src={GreenArrowup} />
              </div>
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12 col-12 p-16 relative">
              {/* <div className="steptext">02</div> */}
              <div className="step">
                <figure className="bg-green">
                  <img src={stepTwo} />
                </figure>
                <h3>We Transcribe + Summarize</h3>
                <p>Get a clean transcript + summary with AI-generated action points</p>
                <img className="greenuparrow" src={GreenArrowdown} />
              </div>
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12 col-12 p-16 relative">
              {/* <div className="steptext">03</div> */}
              <div className="step">
                <figure className="bg-purple">
                  <img src={stepThree} />
                </figure>
                <h3>Edit, Share, or Export</h3>
                <p>Make quick edits, share with your team, or export to Notion, Trello, ClickUp, or your PM tool.</p>
              </div>
            </div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* faq starts here     */}
      <section className="faq-section p-80">
        <div className="container">
          <motion.div className="text-center subheading" whileInView={{ opacity: 1, y: 0 }}
             initial={{ opacity: 0, y: 50 }}
           
            transition={{ duration: 0.4, delay:.5 }}
            viewport={{ once: true }}>
            <h2>FAQ</h2>
            <p>Get answers to common questions about our service</p>
          </motion.div>
          <motion.div className="faq-question-list" whileInView={{ opacity: 1, y: 0 }}
             initial={{ opacity: 0, y: 50 }}
           
            transition={{ duration: 0.4, delay:1 }}
            viewport={{ once: true }}>
            <div className="accordion" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Does it work with private Zoom links?
                  </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    Yes, you can upload recorded Zoom files or connect your account for direct import.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingTwo">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    Can I edit the transcript or action plan?
                  </button>
                </h2>
                <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    Absolutely. Everything is editable — from names to task formatting.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingThree">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    Is my data secure?
                  </button>
                </h2>
                <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    100%. We are GDPR-compliant and follow enterprise-grade encryption practices.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingfour">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapsefour" aria-expanded="false" aria-controls="collapsefour">
                    Can I export to my task manager?
                  </button>
                </h2>
                <div id="collapsefour" className="accordion-collapse collapse" aria-labelledby="headingfour" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    Yes, we support Notion, Trello, ClickUp, and more via integrations.
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* footer starts here     */}
      <footer className="footer-section p-64">
        <div className="container">
          <motion.div className="text-center" whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 50 }}
         
            transition={{ duration: 0.4, delay:.5 }}
            viewport={{ once: true }}>
            <h3>Get started in seconds and never miss a key takeaway again.</h3>

            {/* <div className="banner-cta-btn">
              <a href="#generate-section" className="tryfree">Try it Free</a>
              <button type="button" className="watchdemo" data-bs-toggle="modal" data-bs-target="#watchdemo" ><img src={play} />Watch Demo</button>
            </div> */}
          </motion.div>
          <motion.div className="coptyRight d-flex justify-content-between align-items-center" whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 50 }}
          
            transition={{ duration: 0.4, delay:.5 }}>
            <a href="https://creativebuffer.com/contact-us/" target="_blank"> <img src={ContactIcon} />Contact Us - Creative Buffer</a>
            <p className="text-center mb-0 pb-1 pt-1">2025 Creative Buffer Consultancy Pvt. All rights reserved.</p>
          </motion.div>
        </div>
      </footer>




      <div className="modal fade" id="watchdemo" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"><img src={CloseIcon} /></button>
            </div>
            <div className="modal-body">             
              <iframe width="100%" height="450" src="https://www.youtube.com/embed/25V7msn7po4?si=h3w03crvEC-LWofr" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}