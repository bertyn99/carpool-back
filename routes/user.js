import { Router } from "express";
import { register, logIn, addCar } from "../controllers/user.js";
import verifyToken from "../services/verifyToken.js";

export const router = (function () {
  let apiRouter = Router();
  // add a car to the user account
  apiRouter.route("/:id/car").post(addCar);

  return apiRouter;
})();
