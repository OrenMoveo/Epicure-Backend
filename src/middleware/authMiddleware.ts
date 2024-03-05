import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized - No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret", (err: any) => {
    if (err) {
      console.log("Token verification error:", err);
      return res.sendStatus(401);
    }
    next();
  });
};
