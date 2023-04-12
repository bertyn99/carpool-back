import prisma from "../../prisma/prisma.js";
import argon2 from "argon2";
const UserModel = {
  async create(user) {
    try {
      const { name, email, tel, password } = user;
      const newUser = await prisma.user.create({
        data: {
          name: name,
          email: email,
          tel: tel,
          password: password,
        },
        select: {
          name: true,
          email: true,
          tel: true,
        },
      });

      return newUser;
    } catch (error) {
      throw new Error("Cannot create user");
    }
  },
  async update(id, user) {
    try {
      const { name, email, phone, password } = user;
      const updatedUser = await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          name: name,
          email: email,
          tel: phone,
          password: password,
        },
      });
      return updatedUser;
    } catch (error) {
      console.log(error);
      throw new Error("Cannot update user");
    }
  },
  async delete(id) {
    const deletedUser = await prisma.user.delete({
      where: {
        id,
      },
    });
    return deletedUser;
  },
  async getUserById(id) {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        car: true,
      },
    });
    return user;
  },
  async getUserByEmail(email) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  },
  async getUserByPhone(phone) {
    const user = await prisma.user.findUnique({
      where: {
        tel: phone,
      },
    });
    return user;
  },
  async getUserTrips(id) {
    const trips = await prisma.user.findMany({
      where: {
        id: id,
      },
      include: {
        trip: true,
      },
    });
    return trips;
  },
  async getUserTripsByStatus(id, status) {
    const trips = await prisma.user.findMany({
      where: {
        id: id,
        status: status,
      },
      include: {
        trip: true,
      },
    });
    return trips;
  },
  async getUserTripsByDate(id, date) {
    const trips = await prisma.user.findMany({
      where: {
        userId: id,
        date: date,
      },
      include: {
        trip: true,
      },
    });
    return trips;
  },
  async addCar(id, car) {
    const { nbPlate, color, model } = car;
    const newCar = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        car: {
          upsert: {
            create: {
              nbPlate: nbPlate,
              color: color,
              model: model,
            },
            update: {
              nbPlate: nbPlate,
              color: color,
              model: model,
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

export default UserModel;
