// Dev comments :

import express, { urlencoded, json } from "express";
const app = express();
import compression from "compression";
import morgan from "morgan";
import config from "./config.js";
import cookieParser from "cookie-parser";
import { router as apiAuthRouter } from "./routes/auth.js";
import { router as apiUserRouter } from "./routes/user.js";
import { router as apiTripsRouter } from "./routes/trips.js";

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(compression());
app.use(cookieParser());
app.use(morgan("tiny"));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/api/auth", apiAuthRouter);
app.use("/api/user", apiUserRouter);
app.use("/api/trips", apiTripsRouter);
app.listen(config.PORT, () => {
  console.log(`Application listening on port ${config.PORT}!`);
});
