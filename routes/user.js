import { Router } from "express";
import { register, logIn, addCar, getUser } from "../controllers/user.js";
import verifyToken from "../middlewares/verifyToken.js";

export const router = (function () {
  let apiRouter = Router();
  // add a car to the user account
  apiRouter.route("/:id/car").post(verifyToken,addCar);
  // get the user account
  apiRouter.route("/me/").get(verifyToken,getUser);
  return apiRouter;
})();
