import { config as _config } from "dotenv";

_config();
const config = {
  PORT: process.env.PORT || 3000,
  DBURL: process.env.DBURL,
  JWT_SECRET: process.env.JWT_SECRET || "somethingsecret",
};
export default config;
