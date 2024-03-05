import Joi from "joi";
import { IUser } from "../models/user";

export const createUserValidationSchema = Joi.object<IUser>({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
