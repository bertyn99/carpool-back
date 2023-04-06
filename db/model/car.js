import prisma from "../../prisma/prisma.js";

class CarModel {
  async getCarByCarOwner(carOwner) {
    const car = await prisma.car.findUnique({
      where: {
        carOwner,
      },
    });
    return car;
  }
  async getCarByCarModel(carModel) {
    const car = await prisma.car.findUnique({
      where: {
        carModel,
      },
    });
    return car;
  }
  async getCarByNbPlate(nbPlate) {
    const car = await prisma.car.findUnique({
      where: {
        nbPlate,
      },
    });
    return car;
  }
}

export default CarModel;
