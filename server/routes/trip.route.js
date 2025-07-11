import { Router } from "express";
import { authMiddleWare } from "../middleware/auth.middleware.js";
import { fetchTrips, saveTrip } from "../controller/trip.controller.js";

const router = Router()

router.route("/save-trip").post(authMiddleWare, saveTrip)
router.route("/fetch-trips").get(authMiddleWare, fetchTrips)

export default router

