import UserService from "../services/userServices.js";

const verifyToken = async (req, res, next) => {
  try {
    const { access_token, refreshToken } = req.cookies;
    console.log(access_token, refreshToken);
    /*  const refreshToken = req.cookies.refresh_token; */
    if (!access_token || !refreshToken) {
      throw new Error("No access token");
    }

    const decoded = await UserService.decodeToken(access_token);
    console.log(decoded);
    // For a valid access token
    if (!decoded.id) {
      throw new Error("Invalid access token");
    }

    //check if accesToken expired
    if (!decoded.exp || decoded.exp < Date.now() / 1000) {
      throw new Error("Invalid access token");
    }
    // find user by id or email
    const user = await UserService.getUser(decoded.id);

    req.user = user;
    next();
  } catch (e) {
    console.log(e);
    res.status(401).send({ error: "Please authenticate." });
  }
};

export default verifyToken;