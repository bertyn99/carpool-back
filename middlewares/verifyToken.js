
import UserService from "../services/userServices.js";


const verifyToken = async (req, res, next) => {
  try {
    const accessToken = req.cookies.access_token;
   /*  const refreshToken = req.cookies.refresh_token; */
    if (!accessToken) {
      throw new Error('No access token');
    }


    const decoded = await UserService.decodeToken(accessToken);
    console.log(decoded);
    // find user by id or email
    const user = await UserService.getUser(decoded.id);
    /*  
    if (!user) {
      throw new Error();
    } */

   req.user = user; 
    next();
  } catch (e) {
    console.log(e )
    res.status(401).send({ error: "Please authenticate." });
  }
};

export default verifyToken;
