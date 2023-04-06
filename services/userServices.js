import BaseService from "./baseService.js";
import UserModel from "../db/model/user.js";
const db = UserModel;
const UserService = {
  async getUsers() {
    const users = await db.getUsers();
    return users;
  },

  async getUser(id) {
    const user = await db.getUserById(id);
    return user;
  },

  async createUser(data) {
    const user = await db.create(data);
    return user;
  },

  async updateUser(id, data) {
    const user = await db.update(id, data);
    return user;
  },

  async deleteUser(id) {
    const user = await db.delete(id);
    return user;
  },
  async addCar(id, data) {
    const user = await db.addCar(id, data);
    return user;
  },
};

export default UserService;
