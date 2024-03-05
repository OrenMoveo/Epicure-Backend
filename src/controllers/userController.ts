import { Request, Response } from "express";
import userService from "../services/userService";
import User, { IUser } from "../models/user";

const userController = {
  userSignUp: async (req: Request, res: Response) => {
    try {
      const user = req.body;
      const existingUser = await userService.getOne({
        email: user.email,
      });

      if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
      }

      const newUser = await userService.create(user);
      return res
        .status(201)
        .json({ message: "Registration successful", user: newUser });
    } catch (error) {
      console.error("User registration error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  userLogin: async (req: Request, res: Response) => {
    try {
      const userDetails = req.body;

      const user = await userService.getOne({ email: userDetails.email });

      if (!user || user.password !== userDetails.password) {
        return res.status(401).json({
          errorType: "Authentication",
          message: "Invalid email or password",
        });
      }

      const userData = {
        _id: user._id,
        email: user.email,
      };

      return res
        .status(200)
        .json({ message: "Login successful", user: userData });
    } catch (error) {
      console.error("User login error:", error);
      return res
        .status(500)
        .json({ errorType: "Internal", message: "Internal server error" });
    }
  },

  removeUserById: async (req: Request, res: Response) => {
    try {
      const UserId = req.params.id;
      const removedUser = await userService.remove(UserId);
      if (!removedUser) {
        return res.status(404).json({ error: "User to remove not found" });
      }
      res.json(removedUser);
    } catch (error: any) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  },
};

export default userController;
