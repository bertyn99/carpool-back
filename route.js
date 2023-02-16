import { Router } from "express";
import { register, logIn } from "./controllers/user.js";
import verifyToken from "./services/verifyToken.js";

export const router = (function () {
  let apiRouter = Router();

  //healthCheck
  apiRouter.get("/", (req, res) => {
    res.send("API is running");
  });
  // register user
  apiRouter.route("/register").post(register);

  // connection user
  apiRouter.route("/login").post(logIn);

  return apiRouter;
})();
