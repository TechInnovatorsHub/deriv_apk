import React from "react";
import sammyke from "./assets/sammyke.jpeg";
import './App.css'
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import PRCUTBot from "./components/PRCUTBot";



function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
        <div className="App">
          <nav>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/bots" element={<PRCUTBot />} />
            
            </Routes>
          </nav>
      <div className="left-column">
        <img
          src={sammyke}
          alt="C.E.O" 
          className="portrait-image" 
        />
        <div className="ceo-info">
          <h2>Sammy Boy Ke</h2>
          <p>Founder & CEO</p>
          <p>Sammy Boy has over 10 years of experience in Deriv trading and has helped thousands of traders succeed in the market.</p>
        </div>
        <div className="logo-and-button">
          <img
            src="https://github.com/TechInnovatorsHub/indices-trade-lab/blob/main/src/components/Home/assets/logo.png?raw=true" 
            alt="Deriv Logo" 
            className="Deriv-logo" 
          />
          <button 
            onClick={() => window.open('https://cdn.prod.website-files.com/661e6e1e01dd2f56adc6d3ca/661e6e1f01dd2f56adc6f1ef_169a8e74-d9a0-41c7-84a3-ade841052ae4.jpeg', '_blank')}
          >
            Check Out Deriv Indicators
          </button>
          <button 
            onClick={() => window.open('./components/PRCUTBot', '_blank')}
          >
            Entry Indicators
          </button>
        </div>
      </div>
      <div className="right-column">
        <h1>Welcome to Deriv Trading</h1>
        <p>Master the art of Deriv trading with our expert insights.</p>
        <h2>Why Trade Deriv?</h2>
        <p>
          Deriv trading offers the largest market in the world. With our platform, 
          you can access real-time data, expert analysis, and a comprehensive suite 
          of tools to help you succeed.
        </p>
        <img 
          src="https://github.com/TechInnovatorsHub/indices-trade-lab/blob/main/src/components/Home/assets/phone.png?raw=true" 
          alt="Deriv Trading on Phone" 
          className="phone-image" 
        />
      </div>
    </div>
    </>
  )
}

export default App
