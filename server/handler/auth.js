const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    console.log(token);

    if (!token) throw new Error("unauth");
    const decodedToken = await jwt.verify(token, "secretkey");

    // retrieve the user details of the logged in user
    const user = await decodedToken;

    // pass the user down to the endpoints here
    req.user = user;

    // pass down functionality to the endpoint
    next();
  } catch (error) {
    res.json({
      status: false,
      error: "Invalid request!",
    });
  }
};
