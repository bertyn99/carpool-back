import prisma from "../../prisma/prisma.js";

const TripsModel = {
  async create(trip) {
    const { user_id, duree, etape, date, adress } = trip;
    const newTrip = await prisma.trip.create({
      data: {
        user_id,
        duree,
        etape,
        date,
      },
    });
    return newTrip;
  },
  async update(id, trip) {
    const { user_id, duree, etape, date, adress } = trip;
    const updatedTrip = await prisma.trip.update({
      where: {
        id,
      },
      data: {
        user_id,
        duree,
        etape,
        date,
      },
    });
    return updatedTrip;
  },
  async delete(id) {
    const deletedTrip = await prisma.trip.delete({
      where: {
        id,
      },
    });
    return deletedTrip;
  },
  async getTripById(id) {
    const trip = await prisma.trip.findUnique({
      where: {
        id,
      },
    });
    return trip;
  },
  async getTripByUserId(user_id) {
    const trip = await prisma.trip.findUnique({
      where: {
        user_id,
      },
    });
    return trip;
  },
  async getTripByDate(date) {
    const trip = await prisma.trip.findUnique({
      where: {
        date,
      },
    });
    return trip;
  },
  async getTripByAdress(id) {
    const trip = await prisma.trip.findUnique({
      where: {
        tripId: id,
      },
      include: {
        adress: true,
      },
    });
    return trip;
  },

  async getTrips() {
    const trips = await prisma.trip.findMany({
      select: {
        passengers: true,
        start_address: true,
        end_address: true,
        driver: { select: { name: true } },
      },
    });
    return trips;
  },
};
export default TripsModel;
