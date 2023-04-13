import prisma from "../../prisma/prisma.js";

const TripsModel = {
  async create(trip, start_address, end_address) {
    try {
<<<<<<< HEAD
      const { duree, price,step, date } = trip;
      const {street, city, zipCode, long, lat} = start_address;
      const {street_end, city_end, zipCode_end, long_end, lat_end} = end_address;
=======
      const { duree, price, date } = trip;
      const { street, city, zipCode, long, lat } = start_address;
      const { street_end, city_end, zipCode_end, long_end, lat_end } =
        end_address;
>>>>>>> 6f60133bfb7ee3177bd94b25f95c293d4a6fbbcc
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
<<<<<<< HEAD
          },
          steps : step,
          price : price,
          date  : date,
=======
          price: price,
          date: date,
>>>>>>> 6f60133bfb7ee3177bd94b25f95c293d4a6fbbcc
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
  async update(id, trip, start_address, end_address) {
    try {
      const { duree, price, step, date } = trip;
      const {street, city, zipCode, long, lat} = start_address;
      const {street_end, city_end, zipCode_end, long_end, lat_end} = end_address;
      const updatedTrip = await prisma.trip.update({
        where: {
          id: id,
        },
        data: {
<<<<<<< HEAD
          duree : duree,
          start_address : {
            upsert: {
              create: {
                street  : street,
                city    : city,
                zipCode : zipCode,
                long    : long,
                lat     : lat,
              },
              update: {
                street  : street,
                city    : city,
                zipCode : zipCode,
                long    : long,
                lat     : lat,
              },
            },
          },
          end_address : {
            upsert: {
              create: {
                street  : street_end,
                city    : city_end,
                zipCode : zipCode_end,
                long    : long_end,
                lat     : lat_end,
              },
              update: {
                street  : street_end,
                city    : city_end,
                zipCode : zipCode_end,
                long    : long_end,
                lat     : lat_end,
              },
          },
          },
          steps : step,
          price : price,
          date  : date,
=======
          duree: duree,
          start_address: start_address,
          end_address: end_address,
          price: price,
          steps: steps,
          date: date,
>>>>>>> 6f60133bfb7ee3177bd94b25f95c293d4a6fbbcc
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
<<<<<<< HEAD
    const {street, city, zipCode, long, lat} = adress;
    const newStep = await prisma.trip.update({
=======
    const { street, city, zipCode, long, lat } = adress;
    const newCar = await prisma.trip.update({
>>>>>>> 6f60133bfb7ee3177bd94b25f95c293d4a6fbbcc
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
        step: {
          select: { model: true },
        },
      },
    });
    return newStep;
  },
  async addPassenger(id, user) {
    const { name, email, tel } = user;
    const newPassenger = await prisma.trip.update({
      where: {
        id: Number(id),
      },
      data: {
        passenger: {
          upsert: {
            create: {
              name  : name, 
              email : email,
              tel   : tel,
            },
            update: {
              name  : name,
              email : email,
              tel   : tel,
            },
          },
        },
      },
      select: {
        name: true,
        user: {
          select: { model: true },
        },
      },
    });
    return newPassenger;
  }
};
export default TripsModel;
