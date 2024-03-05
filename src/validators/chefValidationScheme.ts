import Joi from "joi";
import { IChef } from "../models/chef";
import { restaurantObjectIdSchema } from "./validate";

export const createChefValidationSchema = Joi.object<IChef>({
  name: Joi.string().required().max(30),
  pictureUrl: Joi.string().required(),
  restaurants: Joi.array().items(restaurantObjectIdSchema),
  newChef: Joi.boolean().required(),
  views: Joi.number().required().max(1000000000),
  mostViewed: Joi.boolean().required(),
  chefOfTheWeek: Joi.boolean().required(),
  description: Joi.string().max(520).required(),
});

export const updateChefValidationSchema = Joi.object<IChef>({
  name: Joi.string().optional().max(30),
  pictureUrl: Joi.string().optional(),
  restaurants: Joi.array().items(restaurantObjectIdSchema).optional,
  newChef: Joi.boolean().optional(),
  views: Joi.number().optional().max(1000000000),
  mostViewed: Joi.boolean().optional(),
  chefOfTheWeek: Joi.boolean().optional(),
  description: Joi.string().max(520).optional(),
});
