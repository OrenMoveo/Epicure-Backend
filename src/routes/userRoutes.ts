import express from "express";
import { appRoutes } from "../shared/constants";
import { validate } from "../validators/validate";
import { userValidationSchema } from "../validators/userValidationScheme";
import userController from "../controllers/userController";

const userRouter = express.Router();

userRouter.post(
  appRoutes.user.login,
  validate(userValidationSchema),
  userController.userLogin
);

userRouter.post(
  appRoutes.user.signUp,
  validate(userValidationSchema),
  userController.userSignUp
);

userRouter.delete(appRoutes.user.removeUserById, userController.removeUserById);

export default userRouter;
