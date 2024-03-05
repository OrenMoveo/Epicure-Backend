import Joi from "joi";
import { IUser } from "../models/user";

export const userValidationSchema = Joi.object<IUser>({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
