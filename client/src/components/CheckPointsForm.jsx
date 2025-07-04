import React, { useState } from 'react';

function CheckPointsForm({ generateCheckPoints,setCheckpointTime  ,checkpointTime ,loadingCheckpoint  }) {
  const [timeMinutes, setTimeMinutes] = useState('');

  const handleGenerate = () => {
    const minutes = parseInt(timeMinutes);
    if (!minutes || isNaN(minutes) || minutes <= 0) {
      alert("Please enter a valid positive time in minutes.");
      return;
    }
    const intervalInSeconds = minutes * 60;
    onGenerate(intervalInSeconds); // Pass time to parent
    setTimeMinutes(''); // Clear input
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    // Prevent negative numbers and symbols like 'e', '+', '-'
    if (/^-?\d*$/.test(value)) {
      setTimeMinutes(value);
    }
  };

  return (
   <div className="form z-50 p-4 bg-amber-50 rounded-lg shadow-md max-w-md mx-auto mt-10">

      <h2 className="text-2xl text-gray-700 font-bold text-center mb-4">
        Want to Add a Checkpoint?
      </h2>

      <div className="flex flex-col gap-3">
        <label className="text-gray-700 text-sm">
          Enter time interval (in minutes):
        </label>
        <input
          type="number"
          min="1"
          placeholder="e.g., 60"
          value={checkpointTime}
          onChange={(e) => setCheckpointTime( e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 text-black"
        />
        <button
          onClick={generateCheckPoints}
          className={`${loadingCheckpoint ? "bg-gray-400 hover:bg-gray-600 select-none cursor-none" : " bg-blue-500 hover:bg-blue-600"} text-white py-2 rounded  transition`}
        >
          {loadingCheckpoint?"Calculating Checkpoints...": "Generate Checkpoints"}
        </button>
      </div>
    </div>
  );
}

export default CheckPointsForm;
