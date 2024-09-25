import React, { useState } from "react";
import "./App.css";
import TimeCalculator from "./TimeCalculator";
import DayTime from "./DayTime";

function App() {
  const [activeTab, setActiveTab] = useState("daytime");

  return (
    <div className="m-10">
      <div className="tabs">
        <button
          onClick={() => setActiveTab("daytime")}
          className={`tab-button ${activeTab === "daytime" ? "active" : ""}`}
        >
          Day Time
        </button>
        <button
          onClick={() => setActiveTab("timecalculator")}
          className={`tab-button ${
            activeTab === "timecalculator" ? "active" : ""
          }`}
        >
          Time Calculator
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "daytime" && <DayTime />}
        {activeTab === "timecalculator" && <TimeCalculator />}
      </div>
    </div>
  );
}

export default App;
