import React, { useState } from "react";

function DayTime() {
  const [startTime, setStartTime] = useState({ time: "", period: "AM" });
  const [endTime, setEndTime] = useState({ time: "", period: "PM" });
  const [breakTaken, setBreakTaken] = useState({ time: "", period: "AM" });
  const [breakBack, setBreakBack] = useState({ time: "", period: "AM" });
  const [totalTime, setTotalTime] = useState("");

  // Function to convert 12-hour time format to minutes
  const timeToMinutes = ({ time, period }) => {
    if (!time) return 0;
    const [hours, minutes] = time.split(":").map(Number);
    let totalMinutes = (hours % 12) * 60 + (minutes || 0);
    if (period && period.toLowerCase() === "pm") totalMinutes += 12 * 60;
    return totalMinutes;
  };

  // Function to calculate total worked time
  const calculateTotalTime = () => {
    const startMinutes = timeToMinutes(startTime);
    const endMinutes = timeToMinutes(endTime);
    const breakTakenMinutes = timeToMinutes(breakTaken);
    const breakBackMinutes = timeToMinutes(breakBack);

    // Calculate total minutes worked
    const totalWorkedMinutes =
      endMinutes - startMinutes - (breakBackMinutes - breakTakenMinutes);

    const totalHours = Math.floor(totalWorkedMinutes / 60);
    const remainingMinutes = totalWorkedMinutes % 60;
    setTotalTime(`${totalHours} H ${remainingMinutes} minute`);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">
        Work Time Calculator
      </h2>

      {[
        { label: "Start Time", state: startTime, setter: setStartTime },
        { label: "End Time", state: endTime, setter: setEndTime },
        { label: "Break Taken", state: breakTaken, setter: setBreakTaken },
        { label: "Break Back", state: breakBack, setter: setBreakBack },
      ].map(({ label, state, setter }, index) => (
        <div className="mb-4" key={index}>
          <label className="block mb-2 text-sm font-medium">
            {label} (H:MM)
          </label>
          <div className="flex space-x-3">
            <input
              type="text"
              value={state.time}
              onChange={(e) =>
                setter((prev) => ({ ...prev, time: e.target.value }))
              }
              className="border p-3 rounded-lg w-2/3 border-gray-300"
              placeholder="Enter time"
            />
            <select
              value={state.period}
              onChange={(e) =>
                setter((prev) => ({ ...prev, period: e.target.value }))
              }
              className="border p-3 rounded-lg w-1/3 border-gray-300"
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
        </div>
      ))}

      <button
        onClick={calculateTotalTime}
        className="bg-blue-600 text-white py-3 px-6 rounded-lg mt-4 transition duration-300 hover:bg-blue-700"
      >
        Calculate Total Time
      </button>

      {totalTime && (
        <div className="mt-4 text-lg font-semibold text-blue-600">
          Total Time Worked: {totalTime}
        </div>
      )}
    </div>
  );
}

export default DayTime;
