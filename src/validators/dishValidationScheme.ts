import Joi from "joi";
import { IDish } from "../models/dish";
import { restaurantObjectIdSchema } from "./validate";

const MAX_INGREDIENT_LENGTH = 16;
const MAX_INGREDIENTS = 8;

const descriptionLengthSchema = Joi.array().custom((values, helpers) => {
  if (values.length <= MAX_INGREDIENTS) {
    return values;
  }
  return helpers.message({
    custom: "You have inserted too many ingredients, 8 is the maximum!",
  });
}, "custom.descriptionLengthValidation");

const ingredientLengthSchema = Joi.string().custom((values, helpers) => {
  if (values.length <= MAX_INGREDIENT_LENGTH) {
    return values;
  }
  return helpers.message({
    custom: "Some ingredient is too long, 16 letters is the maximum!",
  });
}, "custom.ingredientLengthValidation");

const validMealTypes = ["breakfast", "dinner", "lunch"];

export const createDishValidationSchema = Joi.object<IDish>({
  name: Joi.string().required(),
  pictureUrl: Joi.string().required(),
  description: descriptionLengthSchema.items(ingredientLengthSchema).required(),
  price: Joi.number().max(10000).required(),
  signatureDish: Joi.boolean().required(),
  foodIcon: Joi.string().required(),
  mealType: Joi.array()
    .items(Joi.string().valid(...validMealTypes))
    .required(),
  restaurant: restaurantObjectIdSchema.required(),
});

export const updateDishValidationSchema = Joi.object<IDish>({
  name: Joi.string().optional(),
  pictureUrl: Joi.string().optional(),
  description: descriptionLengthSchema.items(ingredientLengthSchema).optional(),
  price: Joi.number().max(10000).optional(),
  signatureDish: Joi.boolean().optional(),
  foodIcon: Joi.string().optional(),
  mealType: Joi.array()
    .items(Joi.string().valid(...validMealTypes))
    .optional(),
  restaurant: restaurantObjectIdSchema.optional(),
});
