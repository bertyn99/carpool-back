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
async function getTripById(req, res) {
  try {
    const trip = await TripsService.getTripById(req.params.id);
    successRes(res, trip, 200);
  } catch (e) {
    errorRes(res, e, 400);
  }
}
async function createTrip(req, res) {
  try {
    const { trip, start_address, end_address } = req.body;
    const newTrip = await TripsService.createTrip(trip, start_address, end_address);
    successRes(res, newTrip, 201);
  } catch (e) {
    errorRes(res, e, 400);
  }
}
async function updateTrip(req, res) {
  try {
    const { trip, start_address, end_address } = req.body;
    const updatedTrip = await TripsService.updateTrip(
      req.params.id,
      trip,
      start_address,
      end_address
    );
    successRes(res, updatedTrip, 200);
  } catch (e) {
    errorRes(res, e, 400);
  }
}
async function addPassenger(req, res) {
  try {
    const { passenger } = req.body;
    const updatedTrip = await TripsService.addPassenger(req.params.id, passenger);
    successRes(res, updatedTrip, 200);
  } catch (e) {
    errorRes(res, e, 400);
  }
}

export { getTrips, getTripById, createTrip, updateTrip, addPassenger };
