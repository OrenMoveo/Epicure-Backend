import express from "express";
import * as dishController from "../controllers/dishController";
import { appRoutes } from "../shared/constants";

const dishRouter = express.Router();

dishRouter.get(
  appRoutes.dishes.signatureDishes,
  dishController.getSignatureDishes
);

dishRouter.post(appRoutes.dishes.addDish, dishController.addDish);

dishRouter.put(appRoutes.dishes.updateDishById, dishController.updateDishById);

dishRouter.delete(
  appRoutes.dishes.removeDishById,
  dishController.removeDishById
);

export default dishRouter;
