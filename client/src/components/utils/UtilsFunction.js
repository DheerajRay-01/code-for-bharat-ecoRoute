import axios from "axios";

const getIntervalCheckpoints = async (steps, interval, cords) => {
  console.log("Interval in seconds:", interval);

  let checkpoints = [];
  let cumulativeTime = 0;
  let nextInterval = interval;

  for (let i = 0; i < steps.length; i++) {
    cumulativeTime += steps[i].time;

    if (cumulativeTime >= nextInterval) {
      const [lon, lat] = cords[0][steps[i].from_index]; // Geoapify coords are [lon, lat]
      console.log("Coords:", lat, lon);

      let address = "Unknown location";
      try {
        address = await geo(lat, lon);
      } catch (err) {
        console.error(`Reverse geocoding failed at index ${i}:`, err);
      }

      const checkpoint = {
        index: i,
        address,
        time: cumulativeTime,
        instruction: steps[i].instruction.text,
        coordinate: [lat, lon],
      };
      console.log("Checkpoint:", checkpoint);

      checkpoints.push(checkpoint);
      nextInterval += interval; // move to next interval
    }
  }

  return checkpoints;
};



  const fetchWEather = async (lon , lat) => {
     const weatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
  const res = await axios.get(weatherApi);
const weatherData = res.data; // ✅ Extract response data

const description = weatherData.weather?.[0]?.description || "Unknown";
const icon = weatherData.weather?.[0]?.icon;
const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

const tempC = (weatherData.main?.temp - 273.15).toFixed(1); // °C
const humidity = weatherData.main?.humidity;
const windSpeed = weatherData.wind?.speed;


    // console.log(res.data);
    return {tempC,humidity,windSpeed,iconUrl,description}

  }



  const geo = async (lat,lon ) => {
    const response = await axios.get(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&format=json&apiKey=${import.meta.env.VITE_GEOAPIFY_API_KEY}`
    );
    return {
      formatted: response.data.results[0]?.formatted || "Unknown",
      lat,
      lon,
    };
  };



const getEmissionEstimate = async (distanceMeter) => {

  const distanceKm = distanceMeter/1000;
  // console.log(distance);
  
  // const apiKey = import.meta.env.VITE_CARBON_API_KEY; // 🔐 Your API key
  const apiKey = import.meta.env.VITE_CLIMATIQ_API_KEY; // 🔐 Your API key

  try {
    const response = await axios.post(
      "https://www.carboninterface.com/api/v1/estimates",
      {
        type: "vehicle",
        distance_unit: "km", // or "km" if your distance is in kilometers
        distance_value: distanceKm, // your distance value
        vehicle_model_id: "7268a9b7-17e8-4c8d-acca-57059252afe9"
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        }
      }
    );

    const carbon_kg = response.data.data.attributes.carbon_kg;
    // const carbon_mt = response.data.data.attributes.carbon_mt;
    // const res = {
    //   carbon_kg,carbon_mt
    // }

    // console.log("Carbon Estimate:", response.data);
    // console.log("Carbon Estimate:",res);
    
    return carbon_kg
  } catch (error) {
    console.error(
      "Error fetching carbon estimate:",
      error.response?.data || error.message
    );
  }
};





export {
  getIntervalCheckpoints,
  geo,
  fetchWEather,
  getEmissionEstimate
}
