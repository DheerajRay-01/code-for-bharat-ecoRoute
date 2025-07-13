  import React, { useState } from "react";
  import axios from "axios";
  import { FaSearchLocation } from "react-icons/fa";
  import { useNavigate } from "react-router";
  import logo from "../assets/logo.png";
  import { motion } from "framer-motion";

  function Home() {
    const [start, setStart] = useState("");
    const [startOptions, setStartOptions] = useState([]);
    const [startCoords, setStartCoords] = useState(null);

    const [end, setEnd] = useState("");
    const [endOptions, setEndOptions] = useState([]);
    const [endCoords, setEndCoords] = useState(null);

    const navigate = useNavigate();
    const getGeoURL = "https://nominatim.openstreetmap.org/search";

    const fetchStartCoordinates = async () => {
      try {
        const response = await axios.get(getGeoURL, {
          params: { q: start, format: "json" },
          headers: { "User-Agent": "PlaneJourneyApp" },
        });
        setStartOptions(response.data);
      } catch (err) {
        console.error("Error fetching start coords:", err);
      }
    };

    const fetchEndCoordinates = async () => {
      try {
        const response = await axios.get(getGeoURL, {
          params: { q: end, format: "json" },
          headers: { "User-Agent": "PlaneJourneyApp" },
        });
        setEndOptions(response.data);
      } catch (err) {
        console.error("Error fetching end coords:", err);
      }
    };

    const handleGetRoute = () => {
      const data = { start, end, startCoords, endCoords };
      if (data.startCoords && data.endCoords) {
        navigate("/direction", { state: { data } });
      }
    };

    return (
      <div className="min-h-screen px-3 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
        {/* Form */}
        <div className="hero min-h-[80vh] relative z-0">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="hero-content mt-15 md:my-4 flex-col text-center max-w-lg w-full bg-white dark:dark:bg-gray-800  dark:text-gray-200 rounded-3xl shadow-xl p-4 px-8"
          >
            {/* Logo */}
            {/* <motion.img
              src={logo}
              alt="EcoRoute Logo"
              className="mx-auto w-28 h-28 object-contain "
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            /> */}

            <h1 className="text-3xl font-extrabold text-green-700 dark:text-green-400 mb-2">
              Plan Your Journey
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Enter your start and end locations to generate the best route with
              live updates.
            </p>

            {/* Start Location */}
            <div className="w-full mb-4 text-left">
              <label className="font-semibold text-gray-700 dark:text-gray-200">
                Start Location
              </label>
              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  placeholder="e.g., New York"
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                  className="input input-bordered w-full dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-gray-400"
                />
                <button
                  onClick={fetchStartCoordinates}
                  className="btn btn-success"
                  title="Fetch Start"
                >
                  <FaSearchLocation />
                </button>
              </div>
              {startOptions.length > 0 && (
                <select
                  className="select select-bordered w-full mt-2 dark:bg-neutral-700 dark:border-neutral-600"
                  defaultValue=""
                  onChange={(e) => {
                    const selected = startOptions[e.target.value];
                    setStart(selected.display_name);
                    setStartCoords({ lat: selected.lat, lon: selected.lon });
                  }}
                >
                  <option disabled value="">
                    Select Start Point
                  </option>
                  {startOptions.map((opt, i) => (
                    <option key={i} value={i}>
                      {opt.display_name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* End Location */}
            <div className="w-full mb-4 text-left">
              <label className="font-semibold text-gray-700 dark:text-gray-200">
                End Location
              </label>
              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  placeholder="e.g., San Francisco"
                  value={end}
                  onChange={(e) => setEnd(e.target.value)}
                  className="input input-bordered w-full dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-gray-400"
                />
                <button
                  onClick={fetchEndCoordinates}
                  className="btn btn-secondary"
                  title="Fetch End"
                >
                  <FaSearchLocation />
                </button>
              </div>
              {endOptions.length > 0 && (
                <select
                  className="select select-bordered w-full mt-2 dark:bg-neutral-700 dark:border-neutral-600"
                  defaultValue=""
                  onChange={(e) => {
                    const selected = endOptions[e.target.value];
                    setEnd(selected.display_name);
                    setEndCoords({ lat: selected.lat, lon: selected.lon });
                  }}
                >
                  <option disabled value="">
                    Select End Point
                  </option>
                  {endOptions.map((opt, i) => (
                    <option key={i} value={i}>
                      {opt.display_name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Route Summary */}
            {startCoords && endCoords && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-green-50 dark:bg-neutral-700 border-l-4 border-green-400 dark:border-green-500 p-4 rounded-lg text-left mb-4"
              >
                <h3 className="text-lg font-semibold text-green-700 dark:text-green-300 mb-2">
                  Selected Locations
                </h3>
                <p>
                  <strong>Start:</strong> {start} <br />
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Lat: {startCoords.lat}, Lon: {startCoords.lon}
                  </span>
                </p>
                <p className="mt-2">
                  <strong>End:</strong> {end} <br />
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Lat: {endCoords.lat}, Lon: {endCoords.lon}
                  </span>
                </p>
              </motion.div>
            )}

            {/* Get Route Button */}
            <button
              onClick={handleGetRoute}
              disabled={!startCoords || !endCoords}
              className="btn btn-primary btn-wide rounded-full mt-2 transition-transform hover:scale-105"
            >
              🚗 Get Route
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  export default Home;
