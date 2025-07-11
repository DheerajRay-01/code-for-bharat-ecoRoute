import mongoose from "mongoose";

const tripSchema = new mongoose.Schema(
  {
  user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User", 
  required: true
},

    start: {
      type: String,
      trim: true
    },
    end: {
      type: String,
      trim: true
    },
    startLat: {
      type: String, // Because you're passing it as string
      trim: true
    },
    startLon: {
      type: String,
      trim: true
    },
    endLat: {
      type: String,
      trim: true
    },
    endLon: {
      type: String,
      trim: true
    },
    distance: {
      type: String, // e.g., "351.34 km"
      trim: true
    },
    time: {
      type: String, // e.g., "5 hr 8 min"
      trim: true
    },
    carbonData: {
      type: Number, // e.g., 80.84
    },
    checkpointTime: {
      type: String, // e.g., "30"
      default:null,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

export const Trip = mongoose.model("Trip", tripSchema);
