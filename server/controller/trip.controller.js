import { asyncHandler } from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import { Trip } from '../models/trip.model.js';
import {ApiResponse} from '../utils/ApiResponse.js';

const saveTrip = asyncHandler(async (req, res) => {
  const user = req.user?._id;
  const data = req.body;
  console.log(data);

  if (!user) {
    throw new ApiError(400, "User data not found");
  }

  if (!data) {
    throw new ApiError(400, "Save data not found");
  }
  

  // Attach user ID to the trip
  data.user = user;

  const saved = await Trip.create(data);

  if (!saved) {
    throw new ApiError(500, "Failed to save trip");
  }

  res.status(200).json(
    new ApiResponse(200, { data: saved }, "Saved Successfully")
  );
});
const fetchTrips = asyncHandler(async (req, res) => {
  const user = req.user?._id;

  console.log(user);
  

  if (!user) {
    throw new ApiError(400, "User data not found");
  }

  const trips = await Trip.find({user}).lean();

  if (!trips || trips.length < 0) {
    throw new ApiError(500, "Failed to fetch saved trip");
  }

  res.status(200).json(
    new ApiResponse(200, { data: trips }, "fetched Successfully")
  );
});

export { saveTrip ,fetchTrips};
