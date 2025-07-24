const jwt = require("jsonwebtoken");
const User = require("../model/user.model");
const isAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized error token not found" });
    } else {
      const verify = jwt.verify(token, process.env.JWT_SECRET);
      if (!verify) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      req.userId = verify.id;
      next();
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error in isAuth middleware" });
  }
};
module.exports = isAuth;
