import prisma from "../../prisma/prisma.js";

const UserModel = {
  async create(user) {
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
  },
  async update(id, user) {
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
        id: id,
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
  async addCar(car) {
    const { nbPlate, color, model } = car;
    const newCar = await prisma.car.create({
      data: {
        nbPlate: nbPlate,
        color: color,
        model: model,
      },
    });
    return newCar;
  },
};

export default UserModel;
