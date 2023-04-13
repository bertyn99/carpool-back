import TripsModel from "../db/model/trips.js";
const db = TripsModel;

const TripsService = {
  getTrips: async () => {
    const trips = await db.getTrips();
    return trips;
  },
  getTripById: async (id) => {
    const trip = await db.getTripById(id);
    return trip;
  },

  createTrip: async (trip, start_address, end_address) => {
    const newTrip = await db.create(trip, start_address, end_address);
    return newTrip;
  },

  updateTrip: async (id, trip, start_address, end_address) => {
    //check if the user got the right to update the trip
    const tripToUpdate = await db.getTripById(id);
    if (tripToUpdate.userId !== trip.user_id) {
      throw new Error("You are not allowed to update this trip");
    }
    const updatedTrip = await db.update(id, trip, start_address, end_address);
    return updatedTrip;
  },
  addPassenger: async (id, passenger) => {
    const tripToUpdate = await db.getTripById(id);
    if(tripToUpdate.userId == passenger.user_id){
      throw new Error("You are not allowed to add yourself as a passenger");
    }
    const updatedTrip = await db.addPassenger(id, passenger);
    return updatedTrip;
  },

  deleteTrip: async (id) => {
    const deletedTrip = await db.delete(id);
    return deletedTrip;
  },
};

export default TripsService;
