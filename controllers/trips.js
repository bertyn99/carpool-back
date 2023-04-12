import { successRes, errorRes } from "../common/response.js";
import TripsService from "../services/tripsService.js";
async function getTrips(req, res) {
  try {
    const trips = await TripsService.getTrips();
    console.log(trips);
    successRes(res, trips, 200);
  } catch (e) {
    errorRes(res, e, 400);
  }
}

export { getTrips };
