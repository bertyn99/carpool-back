import TripsModel from "../db/model/trips.js";

const TripsService = {
  getTrips: async () => {
    const trips = await TripsModel.getTrips();
    return trips;
  },
  getTripById: async (id) => {
    const trip = await TripsModel.getTripById(id);
    return trip;
  },

  createTrip: async (trip) => {
    const newTrip = await TripsModel.create(trip);
    return newTrip;
  },

  updateTrip: async (id, trip) => {
    //check if the user got the right to update the trip
    const tripToUpdate = await TripsModel.getTripById(id);
    if (tripToUpdate.userId !== trip.user_id) {
      throw new Error("You are not allowed to update this trip");
    }
    const updatedTrip = await TripsModel.update(id, trip);
    return updatedTrip;
  },

  deleteTrip: async (id) => {
    const deletedTrip = await TripsModel.delete(id);
    return deletedTrip;
  },
};

export default TripsService;
