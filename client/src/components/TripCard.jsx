import React from "react";
import {
  FaMapMarkerAlt,
  FaArrowDown,
  FaRoute,
  FaClock,
  FaLeaf,
  FaTrashAlt,
} from "react-icons/fa";

function TripCard({ trip, onView, onDelete }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 flex flex-col justify-between transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
      {/* FROM → TO layout */}
      <div>
        <div
          className="flex items-center gap-2 text-gray-800 dark:text-gray-100 font-semibold"
          title={trip.start}
        >
          <FaMapMarkerAlt className="text-blue-500 dark:text-blue-400" />
          <span className="truncate w-full">{trip.start}</span>
        </div>

        <div className="flex justify-center my-2">
          <FaArrowDown className="text-gray-400 dark:text-gray-500" />
        </div>

        <div
          className="flex items-center gap-2 text-gray-800 dark:text-gray-100 font-semibold"
          title={trip.end}
        >
          <FaMapMarkerAlt className="text-green-500 dark:text-green-400" />
          <span className="truncate w-full">{trip.end}</span>
        </div>
      </div>

      {/* Trip Details */}
      <div className="grid grid-cols-2 gap-3 text-gray-700 dark:text-gray-300 text-sm my-4">
        <div className="flex items-center gap-2">
          <FaRoute className="text-gray-500 dark:text-gray-400" />
          <span>{trip.distance}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaClock className="text-gray-500 dark:text-gray-400" />
          <span>{trip.time}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaLeaf className="text-gray-500 dark:text-gray-400" />
          <span>{trip.carbonData} kg CO₂</span>
        </div>
        <div>
          <span className="font-medium">Checkpoint: </span>
          <span>
            {trip.checkpointTime ? (
              trip.checkpointTime
            ) : (
              <span className="italic text-gray-400 dark:text-gray-500">
                N/A
              </span>
            )}{" "}
            Min
          </span>
        </div>
      </div>

      {/* Footer */}
      <p className="text-xs text-gray-400 dark:text-gray-500 mb-3">
        Saved on: {new Date(trip.createdAt).toLocaleDateString()}
      </p>

      {/* Buttons */}
      <div className="flex justify-between gap-3 cursor-pointer">
        <button
          onClick={() => onView(trip)}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-3 py-2 text-sm font-medium transition duration-300 cursor-pointer"
        >
          View Trip
        </button>
        {/* <button
          onClick={() => onDelete(trip._id)}
          className="flex items-center justify-center bg-red-100 cursor-pointer hover:bg-red-200 text-red-600 rounded-lg px-3 py-2 text-sm transition duration-300"
        >
          <FaTrashAlt />
        </button> */}
      </div>
    </div>
  );
}

export default TripCard;
