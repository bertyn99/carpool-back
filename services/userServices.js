import BaseService from "./baseService.js";
import UserModel from "../db/model/user.js";
class UserService extends BaseService {
  constructor(UserModel) {
    super(UserModel);
  }

  async getUsers() {
    const users = await this.db.user.findMany();
    return users;
  }

  async getUser(id) {
    const user = await this.db.user.findUnique({
      where: {
        id: id,
      },
    });
    return user;
  }

  async createUser(data) {
    const user = await this.db.user.create({
      data: data,
    });
    return user;
  }

  async updateUser(id, data) {
    const user = await this.db.user.update({
      where: {
        id: id,
      },
      data: data,
    });
    return user;
  }

  async deleteUser(id) {
    const user = await this.db.user.delete({
      where: {
        id: id,
      },
    });
    return user;
  }

  async addCar(id, data) {
    const user = await this.db.user.addCar(id, data);
    return user;
  }
}

export default UserService;
