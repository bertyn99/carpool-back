// Dev comments :

import express, { urlencoded, json } from "express";
const app = express();
import compression from "compression";
import morgan from "morgan";
import config from "./config.js";
import { router as apiRouter } from "./route.js";

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(compression());
app.use(morgan("tiny"));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/api", apiRouter);
app.listen(config.PORT, () => {
  console.log(`Application listening on port ${config.PORT}!`);
});
