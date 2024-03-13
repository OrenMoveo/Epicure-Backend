import { Request, Response } from "express";
import userService from "../services/userService";
import bcrypt from "bcrypt";
import { IUser } from "../models/user";
import jwt from "jsonwebtoken";

const HASH_COST_FACTOR = 10;

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

      const hashedPassword = await bcrypt.hash(user.password, HASH_COST_FACTOR);

      const newUser = await userService.create({
        email: user.email,
        password: hashedPassword,
      });

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
      const userDetails: IUser = req.body;

      const user = await userService.getOne({ email: userDetails.email });

      if (
        !user ||
        !(await bcrypt.compare(userDetails.password, user.password))
      ) {
        return res.status(401).json({
          errorType: "Authentication",
          message: "Invalid email or password",
        });
      }

      const userData = {
        _id: user._id,
        email: user.email,
      };

      if (!process.env.JWT_SECRET) {
        console.error("invalid JWT key");
        return;
      }

      const token = jwt.sign(userData, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      return res
        .status(200)
        .json({ message: "Login successful", user: userData, token });
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
