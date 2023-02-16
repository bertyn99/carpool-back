import jwt from "fast-jwt";

const verifyToken = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    // find user by id or email
    /*  
    if (!user) {
      throw new Error();
    } */

    req.token = token;
    /*  req.user = user; */
    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

export default verifyToken;
