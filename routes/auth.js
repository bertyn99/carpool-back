import { Router } from "express";
import { register, logIn } from "../controllers/user.js";
import verifyToken from "../middlewares/verifyToken.js";

export const router = (function () {
  let apiRouter = Router();

  //healthCheck
  apiRouter.get("/", (req, res) => {
    res.send("API is running");
  });
  // register the user
  apiRouter.route("/register").post(register);

  // connection of the user
  apiRouter.route("/login").post(logIn);

  // deconnect the user
  apiRouter.route("/logout").post(logIn);

  return apiRouter;
})();
