const jwt = require("jsonwebtoken");
const verifyUser = (req, res, next) => {
  // Get the user from the jwt token and add id to req object
  try {
    console.log( req.header("authToken"))
    const authHeader = req.header("authToken");
    if (authHeader) {
      const token = authHeader.split(" ")[1];

      jwt.verify(token, "ed#$630KIkpoijhgfds", (err, user) => {
        if (err) {
          if (err.name === "TokenExpiredError") {
            res.status(400).json({
              error: {
                message: "expired session",
              },
            });
          }
          res.status(403).json({ message: "invalid request" });
        }
        console.log("user",user)
        req.user = user;
        next();
      });
    } else {
      res.status(401).json({ message: "you are not authenticated" });
    }
  } catch (error) {
    console.log(error);
    res.status(403).json({ message: "invalid request" });
  }
};

module.exports = {
  verifyUser,
};
