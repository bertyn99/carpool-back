// To declare
//db and schema

import { successRes, errorRes } from "../common/response.js";
import UserService from "../services/userServices.js";

async function register(req, res) {
  try {
    const { name, email, password, tel } = req.body;

    const user = await UserService.registerUser({ name, email, password, tel });
    res.cookie("access_token", user.access_token, {
      httpOnly: true,
      maxAge: 10 * 60 * 1000,
    });
    res.cookie("refreshToken", user.access_token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    });
    successRes(res, user.user, 202);
  } catch (e) {
    errorRes(res, e, 400);
  }
}

async function logIn(req, res) {
  try {
    const { email, password } = req.body;
    const user = await UserService.loginUser({ email, password });

    console.log(user);
    res.cookie("access_token", user.access_token, {
      httpOnly: true,
      maxAge: 10 * 60 * 1000,
    });
    res.cookie("refreshToken", user.access_token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    });

    delete user.refresh_token;
    successRes(res, user.user, 200);
  } catch (e) {
    errorRes(res, e, 400);
  }
}

async function getUser(req, res) {
  try {
    successRes(res, req.user, 200);
  } catch (e) {
    errorRes(res, e, 400);
  }
}

async function handleRefreshToken(req, res) {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      throw new Error("No refresh token");
    }

    const decoded = await UserService.decodeToken(refreshToken);

    //check if accesToken expired
    if (!decoded.exp || decoded.exp < Date.now() / 1000) {
      throw new Error("Invalid access token");
    }
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: true,
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,

      secure: true,
    });
    const token = await UserService.generateToken({ id: decoded.id });
    res.cookie("access_token", token.access_token, {
      httpOnly: true,
      maxAge: 10 * 60 * 1000,
    });
    res.cookie("refreshToken", token.refresh_token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    });
    successRes(res, "Token refreshed", 200);
  } catch (e) {
    errorRes(res, e, 400);
  }
}

async function addCar(req, res) {
  try {
    //get user id from req.user
    const { id } = req.user;
    //get car data from req.body
    const { nbPlate, color, model } = req.body;

    const user = await UserService.addCar(id, { nbPlate, color, model });

    successRes(res, "Card add to Your Accunt", 200);
  } catch (e) {
    errorRes(res, e, 400);
  }
}

async function modifyCar(req, res) {
  try {
    //get user id from req.user
    const { id } = req.user;
    //get car data from req.body
    const { nbPlate, color, model } = req.body;

    const user = await UserService.addCar(id, { nbPlate, color, model });

    successRes(res, "Car of Your Accunt was Updated", 200);
  } catch (e) {
    errorRes(res, e, 400);
  }
}

export { register, logIn, addCar, getUser, handleRefreshToken, modifyCar };
