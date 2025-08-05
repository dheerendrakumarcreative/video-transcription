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
 

import { motion } from "motion/react"


export default function App() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <>
      {/* header starts here */}
      <motion.header initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: .5 }}
            viewport={{ once: true }}>
        <div className="container">
          <div className="logowarp d-flex justify-content-center align-items-center">
            <a href="https://creativebuffer.com/" target="_blank" className="logo">
              <img src={logo} />
            </a>
          </div>
        </div>
      </motion.header>
      {/* banner starts here */}
      <section className="banner-section p-140" >
        <motion.div className="container"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 1.5 }}
        >
          <div className="text-center">        
              
            <h1>From Video to <span>Victory</span>:<br />Turn Meetings Into Clear Action Plans</h1>
            <p className="subheadng">Effortlessly convert YouTube, Zoom, Loom, and screen recordings into searchable transcripts, smart summaries, and actionable to-do lists.</p>

            <div className="banner-cta-btn">
              <a href="#generate-section" className="tryfree">Try it Free</a>
              <button type="button" className="watchdemo" data-bs-toggle="modal" data-bs-target="#watchdemo" ><img src={play} />Watch Demo</button>
            </div>
          </div>
        </motion.div>
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
      <section id="generate-section" className="p-80">
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
      </section>
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

            <div className="banner-cta-btn">
              <a href="#generate-section" className="tryfree">Try it Free</a>
              <button type="button" className="watchdemo" data-bs-toggle="modal" data-bs-target="#watchdemo" ><img src={play} />Watch Demo</button>
            </div>
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