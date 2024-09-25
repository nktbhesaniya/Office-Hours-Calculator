import React, { useState } from "react";

function TimeCalculator() {
  const [entries, setEntries] = useState([]); // Start with an empty list
  const [totalTime, setTotalTime] = useState("");

  // Function to handle input changes
  const handleEntryChange = (index, value) => {
    const newEntries = [...entries];
    newEntries[index] = value;
    setEntries(newEntries);
  };

  // Function to calculate total time
  const calculateTotalTime = () => {
    let totalMinutes = 0;

    entries.forEach((entry) => {
      const [hours, minutes] = entry.split(".").map(Number);
      totalMinutes += (hours || 0) * 60 + (minutes || 0); // Convert hours to minutes and add minutes
    });

    const totalHours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;
    setTotalTime(`${totalHours} H ${remainingMinutes} minute`);
  };

  // Function to handle submission
  const handleSubmit = () => {
    // Normalize all entries before calculation
    const normalizedEntries = entries.map((entry) => {
      const trimmedEntry = entry.trim();
      return trimmedEntry === ""
        ? "0.0"
        : trimmedEntry.includes(".")
        ? trimmedEntry
        : `${trimmedEntry}.0`;
    });
    setEntries(normalizedEntries);
    calculateTotalTime();
  };

  // Function to add a new entry
  const addEntry = () => {
    setEntries([...entries, ""]);
  };

  // Function to remove an entry
  const removeEntry = (index) => {
    const newEntries = entries.filter((_, i) => i !== index);
    setEntries(newEntries);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-green-600">
        Time Calculator
      </h2>

      {entries.map((entry, index) => (
        <div key={index} className="mb-4 flex items-center">
          <input
            type="text"
            value={entry}
            onChange={(e) => handleEntryChange(index, e.target.value)}
            className="border p-3 rounded-lg w-full border-gray-300"
            placeholder="Enter time in format H.MM"
          />
          <button
            onClick={() => removeEntry(index)}
            className="bg-red-600 text-white py-2 px-4 rounded-lg ml-3 transition duration-300 hover:bg-red-700"
          >
            Remove
          </button>
        </div>
      ))}

      <button
        onClick={addEntry}
        className="bg-green-600 text-white py-3 px-6 rounded-lg mt-4 transition duration-300 hover:bg-green-700"
      >
        Add Entry
      </button>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white py-3 px-6 rounded-lg mt-4 ml-2 transition duration-300 hover:bg-blue-700"
      >
        Calculate Total Time
      </button>

      {totalTime && (
        <div className="mt-4 text-lg font-semibold text-green-600">
          Total Time: {totalTime}
        </div>
      )}
    </div>
  );
}

export default TimeCalculator;
