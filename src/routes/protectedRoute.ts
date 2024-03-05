import express from "express";
import { appRoutes } from "../shared/constants";
import { verifyToken } from "../middleware/authMiddleware";

const protectedRouter = express.Router();

protectedRouter.get(appRoutes.base, verifyToken, (req, res) => {
  const authenticatedUser = (req as any).user;
  res.json({ message: "Access granted!", user: authenticatedUser });
});

export default protectedRouter;
