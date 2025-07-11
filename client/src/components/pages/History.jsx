import React, { useEffect, useState } from "react";
import TripCard from "../TripCard";
import { FaRegSadTear } from "react-icons/fa";
import { useNavigate } from "react-router";
import axiosInstance from "../utils/axios";

function History() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await axiosInstance.get("/trip/fetch-trips");
        const data = res?.data?.data?.data;
        console.log(data);
        setTrips(data);
      } catch (error) {
        console.error("Error fetching trips:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  const handleViewTrip = (trip) => {

    console.log("View trip:", trip);

      const data = {
    start: trip.start,
    end: trip.end,
    startCoords: {
      lat: trip.startLat,
      lon: trip.startLon
    },
    endCoords: {
      lat: trip.endLat,
      lon: trip.endLon
    }
  };

  navigate("/direction", { state: { data } });
  };

  const handleDeleteTrip = async (id) => {
    try {
      await axiosInstance.delete(`/trip/${id}`);
      setTrips(trips.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Failed to delete trip:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-8">
        Trip History
      </h1>

      {loading ? (
       <div className="flex justify-center items-center mt-20">
  <div className="relative">
    {/* Square blur background */}
    <div className="absolute inset-0 w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-lg backdrop-blur-md opacity-50"></div>

    {/* Spinner */}
    <div className="flex justify-center items-center w-32 h-32">
      <span className="loading loading-spinner text-primary">
        Loading
      </span>
    </div>
  </div>
</div>

      ) : trips.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-16">
          <FaRegSadTear className="text-5xl text-gray-400 dark:text-gray-500 mb-4" />
          <p className="text-lg text-gray-600 dark:text-gray-300">
            No trips saved yet
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Start tracking your journeys to see them here.
          </p>
          <button
            onClick={() => navigate("/home")}
            className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Make a Trip
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <TripCard
              key={trip._id}
              trip={trip}
              onView={handleViewTrip}
              onDelete={handleDeleteTrip}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default History;
