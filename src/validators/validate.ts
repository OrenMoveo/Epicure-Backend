import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { objectIdSchema } from "../shared/constants";
import chefService from "../services/chefService";
import dishService from "../services/dishService";
import restaurantService from "../services/restaurantService";

export const chefObjectIdSchema = objectIdSchema.custom(
  async (value, helpers) => {
    try {
      const chef = await chefService.getById(value);

      if (!chef) {
        return helpers.error("The chef you chose does not exist");
      }

      return value;
    } catch (error) {
      console.error("Error in chefObjectIdSchema validation:", error);
    }
  },
  "findChefById"
);

export const restaurantObjectIdSchema = objectIdSchema.custom(
  async (values, helpers) => {
    const restaurant = await restaurantService.getById(values);

    if (!restaurant) {
      return helpers.message({
        custom: "The restaurant you chose does not exist",
      });
    }
    return values;
  },
  "custom.restaurantSchema"
);

export const dishObjectIdSchema = objectIdSchema.custom(
  async (value, helpers) => {
    try {
      const dish = await dishService.getById(value);

      if (!dish) {
        return helpers.error("The dish you chose does not exist");
      }

      return value;
    } catch (error) {
      console.error("Error in dishObjectIdSchema validation:", error);
    }
  },
  "findDishById"
);

export const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      const errorMessage = validationResult.error.details
        .map((detail) => detail.message)
        .join(", ");
      return res.status(400).json({ error: errorMessage });
    }

    next();
  };
};
