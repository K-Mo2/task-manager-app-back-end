const { main } = require("../database/mongoose");
const jwt = require("jsonwebtoken");
const userSchema = require("../models/users");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer", "").trim();
    const decoded = jwt.verify(token, "secret");
    const user = await main("user", userSchema);
    const result = await user.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!result) {
      throw new Error();
    }

    req.user = result;
    next();
  } catch (error) {
    res.status(401).send("Error: Please Authenticate");
  }
};

module.exports = auth;
