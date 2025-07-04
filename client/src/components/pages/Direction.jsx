import React, { useEffect, useState } from "react";
import { data, useLocation } from "react-router";
import axios from "axios";
import Map from "../map";
import Steps from "../Steps.jsx";
import { getEmissionEstimate, getIntervalCheckpoints } from "../utils/UtilsFunction.js";
import { RxCross2 } from "react-icons/rx";
import CheckPointsForm from "../CheckPointsForm.jsx";
import CheckPoints from "../CheckPoints.jsx";
import { MdSaveAlt } from "react-icons/md";
import { distance, time } from "framer-motion";
// import { data } from "react-router";

function Direction() {
  const location = useLocation();
  const { data } = location.state || {};
  const { startCoords, endCoords } = data || {};
  const [latlngs, setLatlngs] = useState([]);
  const [steps, setSteps] = useState([]);
  const [coordinates, setCoordinates] = useState([]);
  const [checkpointTime, setCheckpointTime] = useState(data?.checkpointTime ||0);
  const [isCheckpointShow, setIsCheckpointShow] = useState(false);
  const [generatedCheckpoints, setGeneratedCheckpoints] = useState([]);
  const [loadingCheckpoint, setLoadingCheckpoint] = useState(false);
  const [totalDistanceMeter, setTotalDistanceMeter] = useState(null);
  const [time_distance, setTime_distance] = useState({
    time: "",
    distance: "",
  });
  const [carbonData, setCarbonData] = useState(null);

  useEffect(() => {
    if (!startCoords || !endCoords || latlngs.length > 0) return;

    const API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY;
    const MODE = "drive";
    const URL = "https://api.geoapify.com/v1/routing";
    const fullUrl = `${URL}?waypoints=${startCoords.lat},${startCoords.lon}|${endCoords.lat},${endCoords.lon}&type=short&&mode=${MODE}&apiKey=${API_KEY}`;

    axios
      .get(fullUrl)
      .then((response) => {
        console.log(response.data);
        const distance = response.data.features[0].properties.distance;
        const time = response.data.features[0].properties.time;
        const steps = response.data.features[0].properties.legs[0].steps;
        const coordinates = response.data.features[0].geometry.coordinates;
        const coords = response.data.features[0].geometry.coordinates[0];
        const converted = coords.map(([lng, lat]) => [lat, lng]);


        
        setTime_distance({
          distance:
            distance > 1000
              ? `${(distance / 1000).toFixed(2)} km`
              : `${distance.toFixed(0)} m`,
          time:
            time >= 3600
              ? `${Math.floor(time / 3600)} hr ${Math.floor(
                  (time % 3600) / 60
                )} min`
              : time >= 60
              ? `${Math.floor(time / 60)} min ${Math.round(time % 60)} sec`
              : `${Math.round(time)} sec`,
        });
        setCoordinates(coordinates);
        setLatlngs(converted);
        setSteps(steps);
        getCarbonData(distance)
        // saveTrip()
        // setTotalDistanceMeter(distance)
        // console.log("distance,time",totalDistance,totalTime);
        // console.log(carbonRes);
        console.log(steps);
        console.log(coordinates);
        console.log(time_distance);
        console.log(totalDistanceMeter);
      })
      .catch((error) => {
        console.error("Error fetching route:", error);
      });
  }, [startCoords, endCoords, latlngs, time_distance]);

  useEffect(() => {
    console.log("Updated time_distance:", time_distance);
  }, [time_distance]);



  const getCarbonData = async (distance) => {
      const carbonRes = await getEmissionEstimate(distance);
        setCarbonData(carbonRes)
        console.log("carbonData",carbonRes);
        // console.log(carbonData);
  }

  const generateCheckPoints = async () => {
    setLoadingCheckpoint(true);
    if (!checkpointTime || checkpointTime <= 0) {
      alert("Please enter a valid checkpoint time in minutes.");
      return;
    }

    if (!steps || steps.length === 0) {
      console.error("No route steps available.");
      return;
    }

    const intervalInSeconds = checkpointTime * 60;

    console.log("Interval (sec):", intervalInSeconds);
    console.log("Steps:", steps);

    try {
      const checkpoints = await getIntervalCheckpoints(
        steps,
        intervalInSeconds,
        coordinates
      );

      if (!checkpoints || checkpoints.length <= 0) {
        alert("No checkpoints found. Try selecting a smaller time.");
        return;
      }

      console.log("Generated Checkpoints:", checkpoints);

      // Optional: Save checkpoints to state or pass to parent
      setGeneratedCheckpoints(checkpoints);
      setLoadingCheckpoint(false);
    } catch (err) {
      console.error("Error generating checkpoints:", err);
      alert("Something went wrong while generating checkpoints.");
      setLoadingCheckpoint(false);
    }

    setIsCheckpointShow(false);
  };

  // console.log("checkpoint" ,a);

const saveTrip = async ()=>{
  console.log(data);
  
    const saveData = {
     start:data.start,
     end:data.end,
     startCoords,
     endCoords,
      time_distance,
      carbonData,
      checkpointTime,
    };
  console.log(saveData);
  alert("saved");
  
  }
  




  return (
    <>
  <div className="min-h-screen px-4 lg:px-12 py-6 bg-base-100">
    <div className="flex flex-col lg:flex-row gap-8 justify-center">
      {/* 📋 Steps Panel */}
      <div className="w-full lg:w-1/2 space-y-6">
        {/* 🚗 Summary */}
        <div className="bg-base-100 shadow-lg rounded-2xl p-3">
          <h2 className="text-2xl font-bold text-green-700 flex items-center gap-2 mb-4">
            🚗 Summary
          </h2>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 p-4 rounded-xl bg-base-100 ">
  {/* 🚗 Trip Summary Details */}
  <div className="flex flex-col lg:items-end gap-3 ">
    <div className="flex flex-col justify-center  items-center text-sm text-gray-700">
      <p className="truncate max-w-xs font-semibold text-red-700">{data.start.slice(0, 35)}{data.start.length > 30 && "..."}</p>
      <p className="text-gray-500">to</p>
      <p className="truncate max-w-xs font-semibold text-red-700">{data.end.slice(0, 35)}{data.end.length > 30 && "..."}</p>
    </div>
    <button
      className="btn btn-success btn-md lg:btn-lg rounded-full ju"
      onClick={saveTrip}
      // onClick={() => setIsCheckpointShow((prev) => !prev)}
    >
      <MdSaveAlt size={20}/> Save Route
    </button>
  </div>
  <div className="space-y-2 text-sm">
    <div>
      <strong>🕒 Total Time:</strong> {time_distance.time || "Loading..."}
    </div>
    <div>
      <strong>📏 Total Distance:</strong> {time_distance.distance || "Loading..."}
    </div>
    <div>
      <strong>🌱 Total CO₂ Emission:</strong> {carbonData ? `${carbonData} Kg` : "Loading..."}
    </div>
  </div>

  {/* ➡ Start → End & Button */}
  
</div>

        </div>

        {/* 🧭 Directions */}
        <div className="bg-base-100 shadow-lg rounded-2xl p-3">
          <h2 className="text-2xl font-bold text-blue-700 mb-4 flex items-center gap-2">
            🧭 Turn-by-Turn Directions
          </h2>
          <Steps
            step={steps}
            coordinates={coordinates}
            totalTime={time_distance.time}
            totalDistance={time_distance.distance}
          />
        </div>
      </div>

      {/* Vertical Divider */}
      <div className="hidden lg:block w-px bg-gray-300"></div>

      {/* 🗺 Map Panel */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
       

        {/* Checkpoints */}
        <div className="bg-base-100 shadow-lg rounded-2xl p-3">
          <h2 className="text-2xl font-bold text-purple-700 mb-4 text-center">
            🚩 Selected Checkpoints
          </h2>
          {generatedCheckpoints.length <= 0 ? (
            <div className="text-center">
              <button
                className="btn btn-accent btn-wide rounded-full"
                onClick={() => setIsCheckpointShow((prev) => !prev)}
              >
                ➕ Add Checkpoints
              </button>
            </div>
          ) : (
            <CheckPoints checkpoints={generatedCheckpoints} />
          )}
        </div>
         {/* Map */}
        <div className="bg-base-100  rounded-2xl p-3 justify-center flex">
          <Map latlngs={latlngs} />
        </div>
      </div>
    </div>
  </div>

  {/* ✅ Modal */}
  {isCheckpointShow && (
    <dialog id="my_modal_1" className="modal" open>
      <div className="modal-box">
        <h3 className="font-bold text-lg">Add Checkpoints</h3>
        <CheckPointsForm
          generateCheckPoints={generateCheckPoints}
          setCheckpointTime={setCheckpointTime}
          checkpointTime={checkpointTime}
          loadingCheckpoint={loadingCheckpoint}
        />
        <div className="modal-action">
          <button
            className="btn btn-error rounded-full"
            onClick={() => setIsCheckpointShow(false)}
          >
            ✖ Close
          </button>
        </div>
      </div>
    </dialog>
  )}
</>

  );
}

export default Direction;

// import React, { useEffect, useRef } from 'react';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';

// function Map({ latlngs }) {
//   const mapContainerRef = useRef(null);     // HTML div ref
//   const mapInstanceRef = useRef(null);      // Leaflet map ref
//   const polylineRef = useRef(null);         // Polyline ref

//   useEffect(() => {
//     if (!latlngs || !Array.isArray(latlngs) || latlngs.length === 0) return;

//     // 🗺️ Initialize map only once
//     if (!mapInstanceRef.current) {
//       const map = L.map(mapContainerRef.current).setView(latlngs[0], 13);
//       mapInstanceRef.current = map;

//       L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: '&copy; OpenStreetMap contributors',
//       }).addTo(map);
//     }

//     const map = mapInstanceRef.current;

//     // 🔄 Remove old polyline if it exists
//     if (polylineRef.current) {
//       map.removeLayer(polylineRef.current);
//     }

//     // ➕ Add new polyline
//     const newPolyline = L.polyline(latlngs, { color: 'blue', weight: 4 }).addTo(map);
//     polylineRef.current = newPolyline;

//     map.fitBounds(newPolyline.getBounds());

//   }, [latlngs]);

//   return (
//    <div className="w-full h-full">
//     <div
//       ref={mapContainerRef}
//       className="w-full h-full rounded-md shadow-md"
//     />
//   </div>
//   );
// }

// export default Map;
