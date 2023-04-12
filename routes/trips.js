import { Router } from "express";
import { getTrips } from "../controllers/trips.js";
export const router = (function () {
  let apiRouter = Router();

  //get all trips
  apiRouter.get("/", getTrips);

  return apiRouter;
})();
