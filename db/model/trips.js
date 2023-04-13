import prisma from "../../prisma/prisma.js";

const TripsModel = {
  async create(trip, start_address, end_address) {
    try {
      const { duree, price, date } = trip;
      const { street, city, zipCode, long, lat } = start_address;
      const { street_end, city_end, zipCode_end, long_end, lat_end } =
        end_address;
      const newTrip = await prisma.trip.create({
        data: {
          duree: duree,
          start_address: {
            upsert: {
              create: {
                street: street,
                city: city,
                zipCode: zipCode,
                long: long,
                lat: lat,
              },
              update: {
                street: street,
                city: city,
                zipCode: zipCode,
                long: long,
                lat: lat,
              },
            },
          },
          end_address: {
            upsert: {
              create: {
                street: street_end,
                city: city_end,
                zipCode: zipCode_end,
                long: long_end,
                lat: lat_end,
              },
              update: {
                street: street_end,
                city: city_end,
                zipCode: zipCode_end,
                long: long_end,
                lat: lat_end,
              },
            },
          },
          price: price,
          date: date,
        },
        select: {
          duree: true,
          start_address: true,
          end_address: true,
          price: true,
          date: true,
        },
      });
      return newTrip;
    } catch (error) {
      throw new Error("Cannot create trip");
    }
  },
  async update(id, trip) {
    try {
      const { duree, start_address, end_address, price, steps, date } = trip;
      const updatedTrip = await prisma.trip.update({
        where: {
          id: id,
        },
        data: {
          duree: duree,
          start_address: start_address,
          end_address: end_address,
          price: price,
          steps: steps,
          date: date,
        },
        select: {
          duree: true,
          start_address: true,
          end_address: true,
          price: true,
          date: true,
        },
      });
      return updatedTrip;
    } catch (error) {
      throw new Error("Cannot create trip");
    }
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
        driver: { select: { name: true, avatar: true } },
      },
    });
    return trips;
  },
  async addStep(id, adress) {
    const { street, city, zipCode, long, lat } = adress;
    const newCar = await prisma.trip.update({
      where: {
        id: Number(id),
      },
      data: {
        step: {
          upsert: {
            create: {
              street: street,
              city: city,
              zipCode: zipCode,
              long: long,
              lat: lat,
            },
            update: {
              street: street,
              city: city,
              zipCode: zipCode,
              long: long,
              lat: lat,
            },
          },
        },
      },
      select: {
        name: true,
        car: {
          select: { model: true },
        },
      },
    });
    return newCar;
  },
};
export default TripsModel;
