import UserModel from "../db/model/user.js";
import { signerToken, signerRefreshToken, decode } from "../utils/jwt.js";
import argon2 from "argon2";
const db = UserModel;

const UserService = {
  /**
   * name: getUsers
   * @description: get all users
   * @returns {Promise<User[]>}
   */
  async getUsers() {
    const users = await db.getUsers();
    return users;
  },

  /**
   * @description: get user by id
   * @param {} id
   * @returns {Promise<User>}
   */
  async getUser(id) {
    const user = await db.getUserById(id);
    return user;
  },

  /**
   * @description: login user
   * @param {*} data
   * @returns
   */
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

  /**
   *
   * @param {*} id
   * @param {*} data
   * @returns
   */
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

  /**
   * @description: generate both access_token and refresh_token
   * @param {*} payload
   * @returns
   */
  async generateToken(payload) {
    const access = await this.generateAccessToken({ ...payload });
    const refresh = await this.generateRefreshToken({ ...payload });
    return { access_token: access, refresh_token: refresh };
  },

  /**
   * @description: generate access_token
   * @param {*} payload
   * @returns
   */
  async generateAccessToken(payload) {
    return signerToken({ ...payload });
  },
  /**
   * @description: generate refresh_token
   * @param {*} payload
   * @returns
   */
  async generateRefreshToken(payload) {
    return signerRefreshToken({ ...payload });
  },

  /**
   *
   * @param {*} token
   * @returns
   */
  async decodeToken(token) {
    const payload = await decode(token);
    return payload;
  },
};

export default UserService;
