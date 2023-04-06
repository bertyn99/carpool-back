// To declare
//db and schema
import User from "../db/model/user.js";
import { successRes, errorRes } from "../common/response.js";
import UserService from "../services/userServices.js";

async function register(req, res) {
  try {
    const { name, email, password, tel } = req.body;

    const user = await UserService.createUser({ name, email, password, tel });
    successRes(res, user, 202);
  } catch (e) {
    errorRes(res, e, 400);
  }
}

async function logIn(req, res) {
  try {
    successRes(res, "logined");
  } catch (e) {
    errorRes(res, e, 400);
  }
}

export { register, logIn };
