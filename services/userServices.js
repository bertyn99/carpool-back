import BaseService from "./baseService.js";
import UserModel from "../db/model/user.js";
import { createSigner, createVerifier } from "fast-jwt";
import argon2 from "argon2";
const db = UserModel;
//signer
const signerToken = createSigner({ expiresIn: 1000 * 60 * 10, key: "secret" });
const signerRefreshToken = createSigner({
  expiresIn: 1000 * 60 * 60 * 24 * 7,
  key: "secret",
});
// Standard decoder
const decode = createVerifier({ key: "secret" });
const UserService = {
  async getUsers() {
    const users = await db.getUsers();
    return users;
  },

  async getUser(id) {
    const user = await db.getUserById(id);
    return user;
  },

  async loginUser(data) {
    const user = await db.getUserByEmail(data.email);
    if (!user) {
      throw new Error("User not found");
    }
    const isValid = await argon2.verify(user.password, data.password);
    if (!isValid) {
      throw new Error("Wrong password");
    }
    //generate token
    const token = await this.generateToken({ id: user.id });
    //remove password
    delete user.password;
    delete user.role;
    return { ...user, ...token };
  },
  async registerUser(data) {
    //hash password
    const hash = await argon2.hash(data.password);
    data.password = hash;

    //check if user exists
    const userExist = await db.getUserByEmail(data.email);

    if (userExist) {
      throw new Error("User already exists");
    }

    //check if phone number exists
    const phoneExist = await db.getUserByPhone(data.tel);
    if (phoneExist) {
      throw new Error("Phone number already exists");
    }

    //create user
    const user = await db.create(data);

    //generate token
    const token = await this.generateToken({ id: user.id });

    return { ...user, ...token };
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
    //check if user exists
    const userExist = await db.getUserById(id);

    if (!userExist) {
      throw new Error("User not found");
    }
    //add car to the user
    const user = await db.addCar(userExist.id, data);

    return user;
  },

  async generateToken(payload) {
    const access = signerToken({ ...payload });
    const refresh = signerRefreshToken({ ...payload });
    return { access_token: access, refresh_token: refresh };
  },
  async decodeToken(token) {
    const payload = await decode(token);
    return payload;
  },
};

export default UserService;
