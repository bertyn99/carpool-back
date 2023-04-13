import { Router } from "express";
import { getTrips, updateTrip, createTrip, getTripById, addPassenger } from "../controllers/trips.js";
import verifyToken from "../middlewares/verifyToken.js";

export const router = (function () {
  let apiRouter = Router();

  //get all trips
  apiRouter.get("/", getTrips);
  //get a trip by id
  apiRouter.get("/:id", getTripById);
  //create a trip
  apiRouter.post("/", verifyToken, createTrip);
  //update a trip
  apiRouter.put("/:id", verifyToken, updateTrip);
  //add a passenger to a trip
  apiRouter.put("/:id/passenger", verifyToken, addPassenger);

  return apiRouter;
})();
