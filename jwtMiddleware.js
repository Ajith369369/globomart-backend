const jwt = require("jsonwebtoken");

const jwtMiddleware = (req, res, next) => {
  try {
    /**
     * "Authorization" becomes "authorization" in backend.
     * Header contains authorization, content type.
     * Content type contains Bearer token.
     * We need to get token and userId.
     */
    console.log("Inside jwtMiddleware.");
    const token = req.headers["authorization"].split(" ")[1];
    console.log('req.headers["authorization"]: ', req.headers["authorization"]);
    console.log("token: ", token);
    const jwtResponse = jwt.verify(token, "secretKey");
    console.log("jwtResponse: ", jwtResponse);
    req.payload = jwtResponse.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: "Authorization failed due to", error });
  }
};

module.exports = jwtMiddleware;
