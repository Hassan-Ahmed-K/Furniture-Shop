import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()

export const verify_token = (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (!token) {
      return res.status(403).json("Access Denied");
    }
    if (token.startsWith("Bearer")) {
      token = token.slice(7, token.length).trimLeft();
    }
    console.log("token = ",token)
    console.log("rocess.env.JWT_SECRET = ", process.env.JWT_SECRET);
    const verified = jwt.verify(token,process.env.JWT_SECRET);
    req.user = verified;
    console.log("VERIFIED");
    next();
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};
