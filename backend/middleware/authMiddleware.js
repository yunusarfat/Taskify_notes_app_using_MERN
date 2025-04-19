const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token)
    return res.status(401).json({
      msg: "no token ,authorization denied",
    });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;

    next();
  } catch (err) {
    res.status(400).json({
      msg: "Token is not valid",
    });
  }
};
module.exports = auth;
