import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import InstituteAuth from "../models/instituteAuthModel.js";

const protectAccess = asyncHandler(async (req, res, next) => {
  let token;

  // Detailed logging for debugging
  console.log("Authorization Header:", req.headers.authorization);

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract token from header
      token = req.headers.authorization.split(" ")[1];
      console.log("Extracted Token:", token);

      // Verify token
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      console.log("Decoded Token:", decoded);

      // Find institute and exclude password
      const institute = await InstituteAuth.findById(
        decoded.instituteId
      ).select("-password");

      if (!institute) {
        console.log("No institute found for ID");
        res.status(401);
        throw new Error("Institute not found");
      }

      // Attach institute to request
      req.institute = institute;
      next();
    } catch (error) {
      console.error("Authentication Error:", error);

      // More specific error handling
      if (error.name === "JsonWebTokenError") {
        res.status(401);
        throw new Error("Invalid token");
      }
      if (error.name === "TokenExpiredError") {
        res.status(401);
        throw new Error("Token expired");
      }

      res.status(401);
      throw new Error("Not authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export { protectAccess };
