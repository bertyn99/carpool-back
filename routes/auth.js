import { Router } from "express";
import { register, logIn, handleRefreshToken } from "../controllers/user.js";
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

  //refresh the token
  apiRouter.route("/token/refresh").get(verifyToken, handleRefreshToken);

  // deconnect the user
  apiRouter.route("/logout").post(logIn);

  return apiRouter;
})();
