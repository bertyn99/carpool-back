import { Router } from "express";
import { addCar, getUser, modifyCar } from "../controllers/user.js";
import verifyToken from "../middlewares/verifyToken.js";

export const router = (function () {
  let apiRouter = Router();
  // add a car to the user account
  apiRouter.route("/me/car").post(verifyToken, addCar);

  //change the user car
  apiRouter.route("/me/car").put(verifyToken, modifyCar);

  // get the user account
  apiRouter.route("/me/").get(verifyToken, getUser);
  return apiRouter;
})();
