const express = require("express");
const user = require("./controllers/user");
const verifyToken = require("./services/verifyToken");

exports.router = (function () {
  let apiRouter = express.Router();

  //healthCheck
  apiRouter.get("/", (req, res) => {
    res.send("API is running");
  });
  // register user
  apiRouter.route("/register").post(user.register);

  // connection user
  apiRouter.route("/login").post(user.logIn);

  // deconnection user
  apiRouter.route("/logout").post(verifyToken, user.logOut);

  /*   // reconnect user
    apiRouter.route("/reconnect").post(verifyToken, lastView, user.reconnectUser); */

  // my info
  apiRouter.route("/user/:id").get(verifyToken, user.myInfo);

  // edit profile
  apiRouter.route("/user/:id/edit").patch(verifyToken, user.updateInfo);

  /*  
 
   // info user
   apiRouter.route("/info/:id").get(verifyToken, user.infoUser);
 
   
 
   // lost password - client
   apiRouter.route("/lost").post(user.lostPassword);
 
   // lost password - website
   apiRouter.route("/lost/reset").post(user.resetPassword); */

  return apiRouter;
})();
