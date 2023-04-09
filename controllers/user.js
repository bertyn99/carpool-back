// To declare
//db and schema
import User from "../db/model/user.js";
import { successRes, errorRes } from "../common/response.js";
import UserService from "../services/userServices.js";

async function register(req, res) {
  try {
    const { name, email, password, tel } = req.body;

    const user = await UserService.registerUser({ name, email, password, tel });
    res.cookie("access_token", user.access_token, {
      httpOnly: true,
      maxAge:10 * 60 * 1000,
    })
    successRes(res, user.user, 202);
  } catch (e) {
    errorRes(res, e, 400);
  }
}

async function logIn(req, res) {
  try {
    const { email, password } = req.body;
    const user = await UserService.loginUser({ email, password });
    res.cookie("access_token", user.token.access_token, {
      httpOnly: true,
      maxAge:10 * 60 * 1000,
    })
    successRes(res, user.user, 200);
  } catch (e) {
    errorRes(res, e, 400);
  }
}
async function addCar(req, res) {
  try {
    //get user id from req.params
    const { id } = req.params;

    //get car data from req.body
    const { nbPlate, color, model } = req.body;

    const user = await UserService.addCar(id, { nbPlate, color, model });

    successRes(res, "Card add to Your Accunt", 200);
  } catch (e) {
    errorRes(res, e, 400);
  }
}

export { register, logIn, addCar };
