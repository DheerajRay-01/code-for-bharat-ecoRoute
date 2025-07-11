import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { fetchWEather, geo } from './utils/UtilsFunction.js';

function Steps({ step, coordinates,totalTime,totalDistance }) {
  const [enrichedSteps, setEnrichedSteps] = useState([]);

  useEffect(() => {
    const fetchAddresses = async () => {
      if (!step || !coordinates?.[0]) return;

      const enriched = await Promise.all(
        step.map(async (item) => {
          const [lon, lat] = coordinates[0][item.from_index];
          // const [lon, lat] = coordinates[0].slice(item.from_index, item.to_index + 1);
          const address = await geo( lat,lon);
          const weather = await fetchWEather(lon, lat);
          // console.log(weather);
          
          return {
            address,
            distance:item.distance > 1000 ? `${(item.distance / 1000).toFixed(2)} km` : `${item.distance.toFixed(0)} m`,
           time: item.time > 60 ? `${Math.floor(item.time / 60)} min ${Math.round(item.time % 60)} sec`: `${Math.round(item.time)} sec`,
            text: item.instruction.text,
            weather
          };
        })
      );
      console.log(enriched);
      
      setEnrichedSteps(enriched);
    };

    fetchAddresses();
  }, [step, coordinates]);

  return (
  <div className="p-4 rounded-xl h-[700px] overflow-y-auto ">
    <h2 className="text-xl font-semibold mb-4 ">Step-by-Step Directions</h2>
    <ol className="relative  space-y-6 pl-4">
      {enrichedSteps.length > 0 ? (
        enrichedSteps.map((st, i) => (
   <li key={i} className="relative pl-6 text-start space-y-1">
  {/* Blue dot */}
  <div className="absolute w-3 h-3 bg-blue-500 rounded-full left-0 top-2"></div>

  {/* Step Instruction */}
  <p className="text-sm font-semibold ">
    {i + 1}. {st.text}
  </p>

  {/* Address */}
  <p className="text-xs text-gray-500 flex items-start gap-1">
    <span className="text-base">📍</span>
    <span className="leading-snug">{st.address.formatted}</span>|
    <span className="leading-snug">Next point: 🛣 {st.distance} &nbsp;,&nbsp; ⏱ {st.time}</span>
  </p>

  {/* Weather Info Box */}
  <div className="text-xs text-gray-600 bg-blue-200 rounded-lg px-3 py-2 flex items-start gap-3 shadow-sm border border-blue-100">
    <img
      src={st.weather.iconUrl}
      alt={st.weather.description}
      width={28}
      height={28}
      className="mt-0.5"
    />
    <div className="flex flex-col gap-0.5 leading-tight">
      <span className="font-medium">{st.weather.description}</span>
      <span>
        🌡 <strong>Temp:</strong> {st.weather.tempC}°C &nbsp;|&nbsp;
        💧 <strong>Humidity:</strong> {st.weather.humidity}% &nbsp;|&nbsp;
        💨 <strong>Wind:</strong> {st.weather.windSpeed} m/s
      </span>
    </div>
  </div>
</li>


        ))
      ) : (
        <li className="text-gray-500 text-sm">Loading steps...</li>
      )}
    </ol>
  </div>
);

}

export default Steps;
