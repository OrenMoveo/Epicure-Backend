import { Request, Response } from "express";
import userService from "../services/userService";
import User, { IUser } from "../models/user";

const userController = {
  userSignUp: async (req: Request, res: Response) => {
    try {
      const userDetails = req.body;
      const existingUser = await userService.getOne({
        email: userDetails.email,
      });

      if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
      }

      const newUser = await userService.create(userDetails);
      return res
        .status(201)
        .json({ message: "Registration successful", user: newUser });
    } catch (error) {
      console.error("User registration error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default userController;
