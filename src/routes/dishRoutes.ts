import express from "express";
import * as dishController from "../controllers/dishController";
import { appRoutes } from "../shared/constants";
import { validate } from "../validators/validate";
import {
  createDishValidationSchema,
  updateDishValidationSchema,
} from "../validators/dishValidationScheme";

const dishRouter = express.Router();

dishRouter.get(
  appRoutes.dishes.signatureDishes,
  dishController.getSignatureDishes
);

dishRouter.post(
  appRoutes.dishes.addDish,
  validate(createDishValidationSchema),
  dishController.addDish
);

dishRouter.put(
  appRoutes.dishes.updateDishById,
  validate(updateDishValidationSchema),
  dishController.updateDishById
);

dishRouter.delete(
  appRoutes.dishes.removeDishById,
  dishController.removeDishById
);

export default dishRouter;
