import express from "express";
import { appRoutes } from "../shared/constants";
import { validate } from "../validators/validate";
import { createUserValidationSchema } from "../validators/userValidationScheme";
import userController from "../controllers/userController";

const userRouter = express.Router();

userRouter.post(appRoutes.user.signUp, validate(createUserValidationSchema), userController.userSignUp);

export default userRouter;
