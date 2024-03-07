import Joi from "joi";
import { IRestaurant } from "../models/restaurant";
import { chefObjectIdSchema, dishObjectIdSchema } from "./validate";

const priceRangeSchema = Joi.array()
  .items(Joi.number())
  .custom((values, helpers) => {
    if (values.length === 0 || values.length === 2) {
      return values;
    }
    return helpers.message({
      custom:
        "This is not a range! In order to make a price range, please enter only 2 numbers or none",
    });
  }, "custom.rangeValidation");

export const createRestaurantValidationSchema = Joi.object<IRestaurant>({
  name: Joi.string().required().max(30),
  chef: chefObjectIdSchema.required(),
  pictureUrl: Joi.string().required(),
  rating: Joi.number().min(1).max(5).required(),
  mostPopular: Joi.boolean().required(),
  newRestaurant: Joi.boolean().required(),
  restaurantDishes: Joi.array().items(dishObjectIdSchema),
  priceRange: priceRangeSchema.required(),
  isPopular: Joi.boolean().required(),
  openingHours: Joi.object({
    openTime: Joi.string()
      .regex(/^([01]\d|2[0-3]):[0-5]\d$/)
      .required(),
    closeTime: Joi.string()
      .regex(/^([01]\d|2[0-3]):[0-5]\d$/)
      .required(),
  }).required(),
});

export const updateRestaurantValidationSchema = Joi.object<IRestaurant>({
  name: Joi.string().optional().max(30),
  chef: chefObjectIdSchema.optional(),
  pictureUrl: Joi.string().optional(),
  rating: Joi.number().optional(),
  mostPopular: Joi.boolean().optional(),
  newRestaurant: Joi.boolean().optional(),
  restaurantDishes: Joi.array().items(dishObjectIdSchema).optional(),
  priceRange: priceRangeSchema.optional(),
  isPopular: Joi.boolean().optional(),
  openingHours: Joi.object({
    openTime: Joi.string()
      .regex(/^([01]\d|2[0-3]):[0-5]\d$/)
      .optional(),
    closeTime: Joi.string()
      .regex(/^([01]\d|2[0-3]):[0-5]\d$/)
      .optional(),
  }).optional(),
});
